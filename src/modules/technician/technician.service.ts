import { prisma } from "../../lib/prisma";
import ThrowError from "../../utils/throwError";
import httpStatus from "http-status";
import {
  ITechnicianQuery,
  IUpdateTechnicianProfilePayload,
} from "./technician.interface";

const getAllTechniciansFromDB = async (query: ITechnicianQuery) => {
  const { searchTerm, status } = query;
  const technicians = await prisma.user.findMany({
    where: {
      role: "TECHNICIAN",
      AND: [
        {
          OR: [
            {
              name: { contains: searchTerm, mode: "insensitive" },
            },
            {
              email: { contains: searchTerm, mode: "insensitive" },
            },
          ],
        },
        { status: status },
      ],
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

const getTechnicianByIdFromDB = async (technicianId: string) => {
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

const updateTechnicianProfileIntoDB = async (
  technicianId: string,
  payload: IUpdateTechnicianProfilePayload
) => {
  const technician = await prisma.user.findUnique({
    where: {
      id: technicianId,
      role: "TECHNICIAN",
    },
    include: {
      technicianProfile: true,
    },
  });

  if (!technician) {
    throw new ThrowError(httpStatus.NOT_FOUND, "Technician not found!");
  }

  const profileId = technician.technicianProfile?.id;

  const updatedProfile = await prisma.technicianProfile.update({
    where: {
      id: profileId,
    },
    data: {
      bio: payload.bio,
      experience: payload.experience,
      location: payload.location,
      user: {
        update: {
          name: payload.name,
          profilePhoto: payload.profilePhoto,
        },
      },
    },
    include: {
      user: {
        omit: {
          password: true,
        },
      },
    },
  });

  return updatedProfile;
};

export const technicianServices = {
  getAllTechniciansFromDB,
  getTechnicianByIdFromDB,
  updateTechnicianProfileIntoDB,
};
