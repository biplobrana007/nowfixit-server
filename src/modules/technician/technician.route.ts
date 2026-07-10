import { Router } from "express";
import { technicianControllers } from "./technician.controller";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import validateInput from "../../middleware/validiateInput";
import { technicianValidations } from "./technician.validation";

const router = Router();

router.get("/", technicianControllers.getAllTechnicians);
router.get(
  "/:id",
  validateInput(technicianValidations.getTechnicianById),
  technicianControllers.getTechnicianById
);
router.patch(
  "/profile",
  auth(Role.TECHNICIAN),
  technicianControllers.updateTechnicianProfile
);

export const technicianRouter = router;
