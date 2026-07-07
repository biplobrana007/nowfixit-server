import { prisma } from "../../lib/prisma";
import { ICreateServicePayload } from "./service.interface";

const createServiceIntoDB = async (
  technicianId: string,
  payload: ICreateServicePayload
) => {
  const createdService = await prisma.service.create({
    data: {
      title: payload.title,
      description: payload.description,
      price: payload.price,
      duration: payload.duration,
      technicianId: technicianId,
      categoryId: payload.categoryId,
    },
  });

  return createdService;
};

const getAllServiceFromDB = async () => {
  const services = await prisma.service.findMany({
    include: {
      technician: {
        select: {
          name: true,
          email: true,
        },
      },
      category: {
        select: {
          categoryName: true,
        },
      },
    },
  });
  return services;
};
const getServiceByIdFromDB = async () => {};
const updateServiceIntoDB = async () => {};
const deleteServiceFromDB = async () => {};

export const serviceServices = {
  createServiceIntoDB,
  getAllServiceFromDB,
  getServiceByIdFromDB,
  updateServiceIntoDB,
  deleteServiceFromDB,
};
