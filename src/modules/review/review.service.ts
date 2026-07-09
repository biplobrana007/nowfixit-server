import { prisma } from "../../lib/prisma";
import ThrowError from "../../utils/throwError";
import { ICreateReviewPayload, IUpdateReviewPayload } from "./review.interface";

import httpStatus from "http-status";

const createReviewIntoDB = async (
  payload: ICreateReviewPayload,
  customerId: string
) => {
  const { bookingId, rating, comment } = payload;

  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    throw new ThrowError(httpStatus.NOT_FOUND, "Booking not found to review!");
  }

  if (booking.customerId !== customerId) {
    throw new ThrowError(
      httpStatus.UNAUTHORIZED,
      "Sorry you cant review, because this is not your booking!"
    );
  }

  if (booking.status !== "COMPLETED") {
    throw new ThrowError(
      httpStatus.FORBIDDEN,
      "You can't give review because this booking is not completed yet!"
    );
  }

  const createdReview = await prisma.review.create({
    data: {
      rating: rating,
      comment: comment,
      bookingId: bookingId,
      technicianId: booking.technicianId,
      customerId: booking.customerId,
    },
  });

  return createdReview;
};
const updateReviewIntoDB = async (
  payload: IUpdateReviewPayload,
  customerId: string,
  reviewId: string
) => {
  const review = await prisma.review.findUnique({ where: { id: reviewId } });

  if (!review) {
    throw new ThrowError(httpStatus.NOT_FOUND, "Review not found!");
  }

  if (review.customerId !== customerId) {
    throw new ThrowError(
      httpStatus.UNAUTHORIZED,
      "You can't update this review, because this is not your review!"
    );
  }
  const updatedReview = await prisma.review.update({
    where: {
      id: reviewId,
    },
    data: {
      rating: payload.rating,
      comment: payload.comment,
    },
  });

  return updatedReview;
};

export const reviewServices = {
  createReviewIntoDB,
  updateReviewIntoDB,
};
