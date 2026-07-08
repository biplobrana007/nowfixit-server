import { prisma } from "../../lib/prisma";
import ThrowError from "../../utils/throwError";
import { ICreateBookingPayload } from "./booking.interface";
import httpStatus from "http-status";

const createBookingIntoDB = async (
  customerId: string,
  payload: ICreateBookingPayload
) => {
  const service = await prisma.service.findUniqueOrThrow({
    where: {
      id: payload.serviceId,
    },
  });

  if (!service) {
    throw new ThrowError(
      httpStatus.NOT_FOUND,
      "Service is not found for booking!"
    );
  }

  const createdBooking = await prisma.booking.create({
    data: {
      customerId: customerId,
      technicianId: service.technicianId,
      serviceId: service.id,
      bookingTime: payload.bookingTime,
      timeSlot: payload.bookingSlot,
      totalPrice: service.price,
      note: payload.note,
    },
  });

  return createdBooking;
};

const getOwnCreatedBookings = async () => {};
const getOwnReceivedBookings = async () => {};
const getBookingById = async () => {};
const cancelBooking = async () => {};
const updateBookingStatus = async () => {};
const getAllBookings = async () => {};

export const bookingServices = {
  createBookingIntoDB,
  getOwnCreatedBookings,
  getOwnReceivedBookings,
  getBookingById,
  cancelBooking,
  updateBookingStatus,
  getAllBookings,
};
