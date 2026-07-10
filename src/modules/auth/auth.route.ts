import { Router } from "express";
import { authControllers } from "./auth.controller";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { authValidations } from "./auth.validation";
import validateInput from "../../middleware/validiateInput";

const router = Router();

router.post(
  "/register",
  validateInput(authValidations.registerValidation),
  authControllers.registerUser
);
router.post(
  "/login",
  validateInput(authValidations.loginValidation),
  authControllers.loginUser
);
router.get(
  "/me",
  auth(Role.ADMIN, Role.CUSTOMER, Role.TECHNICIAN),
  authControllers.getCurrentUser
);

export const authRouter = router;
