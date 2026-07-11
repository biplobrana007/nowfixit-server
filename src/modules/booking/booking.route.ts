import { Router } from "express";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { bookingControllers } from "./booking.controller";
import validateInput from "../../middleware/validiateInput";
import { bookingValidations } from "./booking.validation";

const router = Router();

router.post(
  "/",
  auth(Role.CUSTOMER),
  validateInput(bookingValidations.createBookingValidation),
  bookingControllers.createBooking
);
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
  validateInput(bookingValidations.getBookingByIdValidation),
  bookingControllers.getBookingById
);

router.patch(
  "/cancel/:id",
  auth(Role.CUSTOMER),
  validateInput(bookingValidations.cancelBookingValidation),
  bookingControllers.cancelBooking
);

router.patch(
  "/status/:id",
  auth(Role.TECHNICIAN),
  validateInput(bookingValidations.updateBookingValidation),
  bookingControllers.updateBookingStatus
);

router.get("/", auth(Role.ADMIN), bookingControllers.getAllBookings);

export const bookingRouter = router;
