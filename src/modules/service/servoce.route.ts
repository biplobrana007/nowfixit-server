import { Router } from "express";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { serviceControllers } from "./service.controller";

const router = Router();

router.post("/", auth(Role.TECHNICIAN), serviceControllers.createService);
router.get("/", serviceControllers.getAllService);
router.get("/:id", serviceControllers.getServiceById);

export const serviceRouter = router;
