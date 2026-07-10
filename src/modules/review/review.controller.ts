import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { reviewServices } from "./review.service";

const createReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const customerId = req.user?.id;

    const createdReview = await reviewServices.createReviewIntoDB(
      payload,
      customerId as string
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Review created successfully!",
      data: createdReview,
    });
  }
);
const updateReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const customerId = req.user?.id;
    const reviewId = req.params.id

    const updatedReview = await reviewServices.updateReviewIntoDB(
      payload,
      customerId as string,
      reviewId as string
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Review updated successfully!",
      data: updatedReview,
    });
  }
);

export const reviewControllers = {
  createReview,
  updateReview,
};
