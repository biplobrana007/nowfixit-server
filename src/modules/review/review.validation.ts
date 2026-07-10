import { Request } from "express";
import {
  validatePositiveNumber,
  validateRequiredFields,
  validateStringLength,
  validateTypes,
  validateUUID,
} from "../../utils/validation.utils";
import ThrowError from "../../utils/throwError";
import { HttpStatusCode } from "axios";

const createReviewValidation = (req: Request) => {
  const { rating, comment, bookingId } = req.body;
  validateRequiredFields(req.body, ["rating", "bookingId"]);
  validateTypes(req.body, {
    rating: "number",
    bookingId: "string",
  });

  validatePositiveNumber("rating", rating);

  if (rating > 5) {
    throw new ThrowError(
      HttpStatusCode.NotAcceptable,
      "Rating cannot be greater than 5"
    );
  }

  validateUUID("bookingId", bookingId);
};

const updateReviewValidation = (req: Request) => {
  const reviewId = req.params.id;
  const { rating, comment } = req.body;
  validateRequiredFields(req.body, ["rating"]);

  validatePositiveNumber("rating", rating);
  if (rating > 5) {
    throw new ThrowError(
      HttpStatusCode.NotAcceptable,
      "Rating cannot be greater than 5"
    );
  }

  validateUUID("ReviewId", reviewId as string);
};

export const reviewValidations = {
  createReviewValidation,
  updateReviewValidation,
};
