import { Router } from "express";
import { authControllers } from "./auth.controller";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/register", authControllers.registerUser);
router.post("/login", authControllers.loginUser);
router.get("/me", auth(Role.ADMIN,Role.CUSTOMER,Role.TECHNICIAN), authControllers.getCurrentUser)

export const authRouter = router;
