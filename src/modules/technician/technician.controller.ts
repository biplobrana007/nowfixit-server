import httpStatus from "http-status";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { technicianServices } from "./technician.service";

const getAllTechnicians = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const technicians = await technicianServices.getAllTechniciansFromDB();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Technicians retrieved successfully!",
      data: technicians,
    });
  }
);
const getTechniciansById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const technician = await technicianServices.getTechniciansByIdFromDB(
      id as string
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Technician retrieved successfully!",
      data: technician,
    });
  }
);

export const technicianControllers = {
  getAllTechnicians,
  getTechniciansById,
};
