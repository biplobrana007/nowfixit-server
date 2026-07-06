import { NextFunction, Request, Response } from "express";
import { authServices } from "./auth.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const user = await authServices.registerUserIntoDB(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User registered successfully!",
      data: user,
    });
  }
);
const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const {accessToken,refreshToken}= await authServices.loginUserFromDB(payload);

    res.cookie("accessToken",accessToken,{
      httpOnly:true,
      secure:false,
      sameSite:"none",
      maxAge: 1000 * 60 * 60 * 24,
    })

    res.cookie("refrehToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User logged in successfully!",
      data: {accessToken,refreshToken},
    });
  }
);

export const authControllers = {
  registerUser,
  loginUser
};
