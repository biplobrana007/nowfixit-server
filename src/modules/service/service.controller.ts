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
      statusCode: httpStatus.CREATED,
      message: "All services retrieved successfully!",
      data: services,
    });
  }
);

const getServiceById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Service retrieved successfully!",
      data: "",
    });
  }
);

const updateService = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Service retrieved successfully!",
      data: "",
    });
  }
);

const deleteService = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Service retrieved successfully!",
      data: "",
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
