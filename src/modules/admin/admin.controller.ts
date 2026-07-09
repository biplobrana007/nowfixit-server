import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { adminServices } from "./admin.service";

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await adminServices.getAllUsersFormDB();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Users retrieved successfully!",
      data: users,
    });
  }
);
const updateUserStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const payload = req.body;
    const user = await adminServices.updateUserStatusIntoDb(userId as string,payload);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User status updated successfully!",
      data: user,
    });
  }
);

export const adminControllers = {
  getAllUsers,
  updateUserStatus,
};
