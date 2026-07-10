import { Request } from "express";
import {
  validateEnum,
  validateRequiredFields,
  validateStringLength,
  validateTypes,
  validateUUID,
} from "../../utils/validation.utils";

const createBookingValidation = (req: Request) => {
  const { serviceId, bookingTime, bookingSlot, note } = req.body;

  console.log(req.body);

  // required
  validateRequiredFields(req.body, ["serviceId", "bookingTime", "bookingSlot"]);

  // type validation
  validateTypes(req.body, {
    serviceId: "string",
    bookingTime: "string",
    bookingSlot: "string",
  });

  //serviceId
  validateUUID("ServiceId", serviceId);

  //note
  validateStringLength("note", note, 6, 200);
};
const getBookingByIdValidation = (req: Request) => {
  const id = req.params.id;
  validateUUID("BookingId", id as string);
};

const cancelBookingValidation = (req: Request) => {
  const id = req.params.id;
  validateUUID("BookingId", id as string);
};

const updateBookingValidation = (req: Request) => {
  const id = req.params.id;
  const { status } = req.body;
  validateUUID("BookingId", id as string);

  validateEnum("Booking status", status, [
    "ACCEPTED",
    "DECLINED",
    "IN_PROGRESS",
    "COMPLETED",
  ]);
};

export const bookingValidations = {
  createBookingValidation,
  getBookingByIdValidation,
  cancelBookingValidation,
  updateBookingValidation,
};
