import { Router } from "express";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { adminControllers } from "./admin.controller";

const router = Router();

router.get("/users", auth(Role.ADMIN), adminControllers.getAllUsers);
router.patch("/users/:id", auth(Role.ADMIN), adminControllers.updateUserStatus);

export const adminRouter = router;
