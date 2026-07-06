import { prisma } from "../../lib/prisma";
import ThrowError from "../../utils/throwError";
import httpStatus from "http-status";

const getAllTechniciansFromDB = async () => {
  const technicians = await prisma.user.findMany({
    where: {
      role: "TECHNICIAN",
    },
    omit: {
      password: true,
    },
    include: {
      technicianProfile: true,
    },
  });
  return technicians;
};

const getTechniciansByIdFromDB = async (technicianId: string) => {
  const technician = await prisma.user.findUnique({
    where: {
      id: technicianId,
      role: "TECHNICIAN",
    },
    omit: {
      password: true,
    },
    include: {
      technicianProfile: true,
    },
  });

  if (!technician) {
    throw new ThrowError(httpStatus.NOT_FOUND, "Technician not found!");
  }

  return technician;
};

export const technicianServices = {
  getAllTechniciansFromDB,
  getTechniciansByIdFromDB,
};
