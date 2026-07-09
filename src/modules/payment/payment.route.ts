import { Router } from "express";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { paymentControllers } from "./payment.controller";

const router = Router();

router.post(
  "/initiate-payment",
  auth(Role.CUSTOMER),
  paymentControllers.initiatePayment
);

router.post("/", paymentControllers.verifyPayment);

export const paymentRouter = router;
