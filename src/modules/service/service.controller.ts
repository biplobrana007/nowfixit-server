import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { serviceServices } from "./service.service";

const createService = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const technicianId = req.user?.id;

    const createdService = await serviceServices.createServiceIntoDB(
      technicianId as string,
      payload
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Service created successfully!",
      data: createdService,
    });
  }
);

const getAllService = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const services = await serviceServices.getAllServiceFromDB();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All services retrieved successfully!",
      data: services,
    });
  }
);

const getServiceById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const serviceId = req.params.id;
    const service = await serviceServices.getServiceByIdFromDB(
      serviceId as string
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Service retrieved successfully!",
      data: service,
    });
  }
);

const updateService = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const serviceId = req.params.id;
    const technicanId = req.user?.id;
    const payload = req.body;

    const updatedService = await serviceServices.updateServiceIntoDB(
      serviceId as string,
      technicanId as string,
      payload
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Service updated successfully!",
      data: updatedService,
    });
  }
);

const deleteService = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const serviceId = req.params.id;
    const technicanId = req.user?.id;
    const isAdmin = req.user?.role === "ADMIN";

    await serviceServices.deleteServiceFromDB(
      serviceId as string,
      technicanId as string,
      isAdmin as boolean
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Service deleted successfully!",
      data: null,
    });
  }
);

export const serviceControllers = {
  createService,
  getAllService,
  getServiceById,
  updateService,
  deleteService,
};
