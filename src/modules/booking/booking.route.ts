import { Router } from "express";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { bookingControllers } from "./booking.controller";
import { bookingServices } from "./booking.service";

const router = Router();

router.post("/", auth(Role.CUSTOMER), bookingControllers.createBooking);
router.get(
  "/my-bookings",
  auth(Role.CUSTOMER),
  bookingControllers.getOwnCreatedBookings
);
router.get(
  "/my-received-bookings",
  auth(Role.TECHNICIAN),
  bookingControllers.getOwnReceivedBookings
);
router.get(
  "/:id",
  auth(Role.ADMIN, Role.CUSTOMER, Role.TECHNICIAN),
  bookingControllers.getBookingById
);

export const bookingRouter = router;
