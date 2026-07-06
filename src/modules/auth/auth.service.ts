import config from "../../config";
import { prisma } from "../../lib/prisma";
import { IRegisterUserPayload } from "./auth.interface";
import bcrypt from "bcrypt";

const registerUserIntoDB = async (payload: IRegisterUserPayload) => {
  const { name, email, password, profilePhoto, role } = payload;
  // await prisma.user.findUnique({
  //   where: { email },
  // });

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
