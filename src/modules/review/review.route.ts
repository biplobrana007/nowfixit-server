import { Router } from "express";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { reviewControllers } from "./review.controller";

const router = Router();

router.post("/", auth(Role.CUSTOMER), reviewControllers.createReview);

router.patch("/:id", auth(Role.CUSTOMER), reviewControllers.updateReview);

export const reviewRouter = router;
