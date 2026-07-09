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

router.get(
  "/",
  auth(Role.CUSTOMER, Role.TECHNICIAN),
  paymentControllers.getCurretUserPayments
);

router.get(
  "/:id",
  auth(Role.CUSTOMER, Role.TECHNICIAN),
  paymentControllers.getPaymentDetails
);

export const paymentRouter = router;
