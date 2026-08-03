import { toUnicode } from "node:punycode";
import { prisma } from "../../lib/prisma";
import ThrowError from "../../utils/throwError";
import {
  FilteredService,
  ICreateServicePayload,
  IServiceQuery,
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

const getAllServiceFromDB = async (query: IServiceQuery) => {
  const { type, location, rating } = query;
  console.log(query);

  const services = await prisma.service.findMany({
    where: {
      AND: [
        {
          technician: {
            technicianProfile: { location: { equals: location } },
          },
        },
        { category: { categoryName: { equals: type } } },
      ],
    },
    include: {
      technician: {
        select: {
          technicianReviews: {
            select: {
              rating: true,
              comment: true,
              customer: {
                select: {
                  name: true,
                  profilePhoto: true,
                },
              },
            },
          },
          technicianProfile: {
            select: {
              location: true,
            },
          },
        },
      },
      category: {
        select: {
          categoryName: true,
        },
      },
    },
    omit: {
      categoryId: true,
      createdAt: true,
      technicianId: true,
      updatedAt: true,
    },
  });

  const servicesWithRating = services.map((service) => {
    let ratingSum = 0;
    const ratings = service.technician.technicianReviews.map((r) => {
      return r.rating;
    });

    ratings.forEach((r) => {
      ratingSum = ratingSum + r;
    });

    const averageRating = ratingSum / ratings.length;

    return { ...service, averageRating };
  });

  if (rating) {
    const filteredService: FilteredService[] = [];
    servicesWithRating.forEach((s) => {
      s.averageRating === Number(rating) &&
        filteredService.push(s as FilteredService);
    });

    return filteredService;
  } else {
    return servicesWithRating;
  }
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
