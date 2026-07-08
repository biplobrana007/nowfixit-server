import { Router } from "express";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { bookingControllers } from "./booking.controller";


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

router.patch(
  "/:id/status",
  auth(Role.TECHNICIAN),
  bookingControllers.updateBookingStatus
);

router.get("/", auth(Role.ADMIN), bookingControllers.getAllBookings);

export const bookingRouter = router;
