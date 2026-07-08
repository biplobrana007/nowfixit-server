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

const getOwnCreatedBookingsFromDB = async (customerId: string) => {
  const bookings = await prisma.booking.findMany({
    where: {
      customerId: customerId,
    },
  });

  return bookings;
};

const getOwnReceivedBookingsFromDB = async (technicanId: string) => {
  const bookings = await prisma.booking.findMany({
    where: {
      technicianId: technicanId,
    },
  });

  return bookings;
};

const getBookingByIdFromDB = async (
  bookingId: string,
  userId: string,
  isAdmin: boolean
) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    throw new ThrowError(httpStatus.NOT_FOUND, "Booking not found!");
  }

  if (
    !isAdmin &&
    userId !== booking.technicianId &&
    userId !== booking.customerId
  ) {
    throw new ThrowError(
      httpStatus.UNAUTHORIZED,
      "You have no access for this booking!"
    );
  }

  return booking;
};

const cancelBookingIntoDB = async () => {};
const updateBookingStatusIntoDB = async () => {};

const getAllBookingsFromDB = async () => {
  const bookings = await prisma.booking.findMany();
  return bookings;
};

export const bookingServices = {
  createBookingIntoDB,
  getOwnCreatedBookingsFromDB,
  getOwnReceivedBookingsFromDB,
  getBookingByIdFromDB,
  cancelBookingIntoDB,
  updateBookingStatusIntoDB,
  getAllBookingsFromDB,
};
