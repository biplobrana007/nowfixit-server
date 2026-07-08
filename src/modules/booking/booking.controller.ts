import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { bookingServices } from "./booking.service";

const createBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const customerId = req.user?.id;
    const payload = req.body;

    const createdBooking = await bookingServices.createBookingIntoDB(
      customerId as string,
      payload
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Booking created successfully!",
      data: createdBooking,
    });
  }
);

const getOwnCreatedBookings = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const customerId = req.user?.id;

    const bookings = await bookingServices.getOwnCreatedBookingsFromDB(
      customerId as string
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Retrieved customer's own bookings successfully!",
      data: bookings,
    });
  }
);

const getOwnReceivedBookings = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const technicanId = req.user?.id;
    const bookings = await bookingServices.getOwnReceivedBookingsFromDB(
      technicanId as string
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Retrieved technician's own received bookings successfully!",
      data: bookings,
    });
  }
);

const getBookingById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const bookingId = req.params.id;
    const userId = req.user?.id;
    const isAdmin = req.user?.role === "ADMIN";

    const booking = await bookingServices.getBookingByIdFromDB(
      bookingId as string,
      userId as string,
      isAdmin
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Booking retrieved successfully!",
      data: booking,
    });
  }
);

const cancelBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Service created successfully!",
      data: "",
    });
  }
);
const updateBookingStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Service created successfully!",
      data: "",
    });
  }
);

// access: only admin
const getAllBookings = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Service created successfully!",
      data: "",
    });
  }
);

export const bookingControllers = {
  createBooking,
  getOwnCreatedBookings,
  getOwnReceivedBookings,
  getBookingById,
  cancelBooking,
  updateBookingStatus,
  getAllBookings,
};
