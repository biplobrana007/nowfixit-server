import { Router } from "express";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { bookingControllers } from "./booking.controller";

const router = Router();

router.post("/",auth(Role.CUSTOMER), bookingControllers.createBooking)

export const bookingRouter = router;
