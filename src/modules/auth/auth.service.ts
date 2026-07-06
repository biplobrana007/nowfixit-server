import { SignOptions } from "jsonwebtoken";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { jwtUtils } from "../../utils/jwt";
import ThrowError from "../../utils/throwError";
import { ILoginUserPaylod, IRegisterUserPayload } from "./auth.interface";
import bcrypt from "bcrypt";
import httpStatus from "http-status";

const registerUserIntoDB = async (payload: IRegisterUserPayload) => {
  const { name, email, password, profilePhoto, role } = payload;

  if (role === "ADMIN") {
    throw new ThrowError(
      httpStatus.FORBIDDEN,
      "You cant register as ADMIN. Please try to register as TECHNICIAN or CUSTOMER"
    );
  }

  const isUserExist = await prisma.user.findUnique({
    where: { email },
  });

  if (isUserExist) {
    throw new ThrowError(
      httpStatus.BAD_REQUEST,
      "User already exist with this email. Please try another email."
    );
  }

  const hashPasword = await bcrypt.hash(
    password,
    Number(config.bcypt_salt_rounds)
  );

  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPasword,
      role,
    },
  });

  if (createdUser.role === "TECHNICIAN") {
    await prisma.technicianProfile.create({
      data: {
        userId: createdUser.id,
      },
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: createdUser.id,
      email: createdUser.email || email,
    },
    omit: {
      password: true,
    },
  });

  return user;
};

const loginUserFromDB = async (payload: ILoginUserPaylod) => {
  const { email, password } = payload;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new ThrowError(
      httpStatus.UNAUTHORIZED,
      "Threre is no user with this email!"
    );
  }

  if (user.status === "BLOCKED") {
    throw new ThrowError(
      httpStatus.FORBIDDEN,
      "Your account has been blocked. Please contact support!"
    );
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new ThrowError(
      httpStatus.UNAUTHORIZED,
      "Incorrect password, please try another password!"
    );
  }

  const Jwtpayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwtUtils.createToken(
    Jwtpayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in as SignOptions
  );

  const refreshToken = jwtUtils.createToken(
    Jwtpayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in as SignOptions
  );

  return {
    accessToken,
    refreshToken,
  };
};

const getCurrentUserFromDB = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    omit: {
      password: true,
    },
  });

  return user;
};

export const authServices = {
  registerUserIntoDB,
  loginUserFromDB,
  getCurrentUserFromDB,
};
