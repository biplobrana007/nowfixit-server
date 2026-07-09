import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "../src/config/index";
import { authRouter } from "./modules/auth/auth.route";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { notFound } from "./middleware/notFound";
import { technicianRouter } from "./modules/technician/technician.route";
import { categoryRouter } from "./modules/category/category.route";
import { serviceRouter } from "./modules/service/servoce.route";
import { bookingRouter } from "./modules/booking/booking.route";
import { paymentRouter } from "./modules/payment/payment.route";
import { reviewRouter } from "./modules/review/review.route";

const app: Application = express();

app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  })
);

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

//api
app.use("/api/auth", authRouter);
app.use("/api/technicians", technicianRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/services", serviceRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/reviews", reviewRouter);

//error handling
app.use(notFound);
app.use(globalErrorHandler);

export default app;
