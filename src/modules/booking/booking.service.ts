import { CANCELLED } from "node:dns";
import { BookingStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import ThrowError from "../../utils/throwError";
import {
  ICreateBookingPayload,
  IUpdateBookingStatus,
} from "./booking.interface";
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

  if (bookings.length === 0) {
    throw new ThrowError(httpStatus.NOT_FOUND, "You have no bookings!");
  }

  return bookings;
};

const getOwnReceivedBookingsFromDB = async (technicanId: string) => {
  const bookings = await prisma.booking.findMany({
    where: {
      technicianId: technicanId,
    },
  });

  if (bookings.length === 0) {
    throw new ThrowError(httpStatus.NOT_FOUND, "You have no bookings!");
  }

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

const cancelBookingIntoDB = async (bookingId: string, customerId: string) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    throw new ThrowError(httpStatus.NOT_FOUND, "Booking not found!");
  }

  if (customerId !== booking.customerId) {
    throw new ThrowError(
      httpStatus.UNAUTHORIZED,
      "You have no access for this booking!"
    );
  }

  const canCalcel =
    booking.status === "REQUESTED" || booking.status === "ACCEPTED";

  if (!canCalcel) {
    throw new ThrowError(
      httpStatus.FORBIDDEN,
      `Sorry, you can't cancel the ${booking.status} booking.`
    );
  }

  const cancelledBooking = await prisma.booking.update({
    where: {
      id: booking.id,
    },
    data: {
      status: "CANCELLED",
    },
  });

  return cancelledBooking;
};

const updateBookingStatusIntoDB = async (
  bookingId: string,
  technicanId: string,
  payload: IUpdateBookingStatus
) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    throw new ThrowError(httpStatus.NOT_FOUND, "Booking not found!");
  }

  if (technicanId !== booking.technicianId) {
    throw new ThrowError(
      httpStatus.UNAUTHORIZED,
      "You have no access for this booking!"
    );
  }

  const allowedUpdation: Record<BookingStatus, BookingStatus[]> = {
    REQUESTED: ["ACCEPTED", "DECLINED"],
    PAID: ["IN_PROGRESS"],
    IN_PROGRESS: ["COMPLETED"],
    ACCEPTED: [],
    COMPLETED: [],
    CANCELLED: [],
    DECLINED: [],
  };

  const canUpdate = allowedUpdation[booking.status].includes(payload.status!);

  if (!canUpdate) {
    throw new ThrowError(httpStatus.BAD_REQUEST, "Invalid status updation!");
  }

  const statusUpdateddBooking = await prisma.booking.update({
    where: { id: booking.id },
    data: {
      status: payload.status,
    },
  });

  return statusUpdateddBooking;
};

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
