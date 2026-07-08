import { BookingStatus } from "../../../generated/prisma/enums";

export interface ICreateBookingPayload {
  serviceId: string;
  bookingTime: string;
  bookingSlot: string;
  note?: string;
}
