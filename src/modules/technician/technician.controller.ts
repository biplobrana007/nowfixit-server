import httpStatus from "http-status";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { technicianServices } from "./technician.service";

const getAllTechnicians = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const technicians = await technicianServices.getAllTechniciansFromDB(query);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Technicians retrieved successfully!",
      data: technicians,
    });
  }
);
const getTechnicianById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const technician = await technicianServices.getTechnicianByIdFromDB(
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
const updateTechnicianProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;
    const payload = req.body;
    const updatedProfile =
      await technicianServices.updateTechnicianProfileIntoDB(
        id as string,
        payload
      );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Technician profile updated successfully!",
      data: updatedProfile,
    });
  }
);

export const technicianControllers = {
  getAllTechnicians,
  getTechnicianById,
  updateTechnicianProfile,
};
