import { Router } from "express";
import { technicianControllers } from "./technician.controller";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";


const router = Router();

router.get("/",technicianControllers.getAllTechnicians)
router.get("/:id",technicianControllers.getTechniciansById)
router.patch("/profile",auth(Role.TECHNICIAN),technicianControllers.updateTechnicianProfile)

export const technicianRouter = router;
