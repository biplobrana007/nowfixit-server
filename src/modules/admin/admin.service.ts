import { prisma } from "../../lib/prisma";
import { IUpdateUserStatus } from "./admin.interface";

const getAllUsersFormDB = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const updateUserStatusIntoDb = async (
  userId: string,
  payload: IUpdateUserStatus
) => {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      status: payload.status,
    },
  });

  return user;
};
export const adminServices = {
  getAllUsersFormDB,
  updateUserStatusIntoDb,
};
