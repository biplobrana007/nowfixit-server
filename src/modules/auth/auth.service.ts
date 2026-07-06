import config from "../../config";
import { prisma } from "../../lib/prisma";
import ThrowError from "../../utils/throwError";
import { IRegisterUserPayload } from "./auth.interface";
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

export const authServices = {
  registerUserIntoDB,
};
