import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { paymentServices } from "./payment.service";
import { User } from "../../../generated/prisma/client";

const initiatePayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const customer = req.user;
    const payload = req.body;
    const paymentInit = await paymentServices.initiatePaymentIntoDB(
      customer as User,
      payload
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Payment initiated successfully!",
      data: paymentInit,
    });
  }
);

const verifyPayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { bookingId, tranId, status } = req.query;
    const payload = req.body;

    const response = await paymentServices.verifyPaymentIntoDB(
      bookingId as string,
      tranId as string,
      status as string,
      payload
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Payment verified successfully!",
      data: response,
    });
  }
);

const getCurretUserPayments = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const payments = await paymentServices.getCurrentUserPaymentsFromDB(
      userId as string
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Payments retrieved successfully!",
      data: payments,
    });
  }
);
const getPaymentDetails = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const paymentId = req.params.id;
    const payment = await paymentServices.getPaymentDetailsFromDB(
      userId as string,
      paymentId as string
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Payment details retrieved successfully!",
      data: payment,
    });
  }
);

export const paymentControllers = {
  initiatePayment,
  verifyPayment,
  getCurretUserPayments,
  getPaymentDetails
};
