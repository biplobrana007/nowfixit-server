import { Router } from "express";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { reviewControllers } from "./review.controller";
import validateInput from "../../middleware/validiateInput";
import { reviewValidations } from "./review.validation";

const router = Router();

router.post(
  "/",
  auth(Role.CUSTOMER),
  validateInput(reviewValidations.createReviewValidation),
  reviewControllers.createReview
);

router.patch(
  "/:id",
  auth(Role.CUSTOMER),
  validateInput(reviewValidations.updateReviewValidation),
  reviewControllers.updateReview
);

export const reviewRouter = router;
