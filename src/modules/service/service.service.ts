import { prisma } from "../../lib/prisma";
import ThrowError from "../../utils/throwError";
import {
  ICreateServicePayload,
  IUpdateServicePayload,
} from "./service.interface";
import httpStatus from "http-status";

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

const getServiceByIdFromDB = async (serviceId: string) => {
  const service = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
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

  if (!service) {
    throw new ThrowError(httpStatus.NOT_FOUND, "Service Not Found!");
  }
  return service;
};

const updateServiceIntoDB = async (
  serviceId: string,
  technicanId: string,
  payload: IUpdateServicePayload
) => {
  const service = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
  });

  if (!service) {
    throw new ThrowError(httpStatus.NOT_FOUND, "Service not found!");
  }

  if (service.technicianId !== technicanId) {
    throw new ThrowError(
      httpStatus.FORBIDDEN,
      "You are not the owner of this service. So you can't update the service!"
    );
  }

  const updatedService = await prisma.service.update({
    where: {
      id: service.id,
      technicianId: service.technicianId,
    },
    data: {
      title: payload.title,
      description: payload.description,
      price: payload.price,
      duration: payload.duration,
      categoryId: payload.categoryId,
      isAvailable: payload.isAvailable,
    },
  });

  return updatedService;
};

const deleteServiceFromDB = async (
  serviceId: string,
  technicanId: string,
  isAdmin: boolean
) => {
  const service = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
  });

  if (!service) {
    throw new ThrowError(httpStatus.NOT_FOUND, "Service not found!");
  }

  if (!isAdmin && service.technicianId !== technicanId) {
    throw new ThrowError(
      httpStatus.UNAUTHORIZED,
      "NO! access. You can't delete the service!"
    );
  }

  await prisma.service.delete({
    where: {
      id: service.id,
    },
  });
};

export const serviceServices = {
  createServiceIntoDB,
  getAllServiceFromDB,
  getServiceByIdFromDB,
  updateServiceIntoDB,
  deleteServiceFromDB,
};
