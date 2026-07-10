import { Request } from "express";
import { validateUUID } from "../../utils/validation.utils";

const initiatePaymentVlaidation = (req: Request) => {
  const { bookingId } = req.body;

  validateUUID("BookingId", bookingId);
};

const getPaymentDetailsValidation = (req: Request) => {
  const paymentId = req.params.id;

  validateUUID("PaymentId", paymentId as string);
};

export const paymentValidations = {
  initiatePaymentVlaidation,
  getPaymentDetailsValidation
};
