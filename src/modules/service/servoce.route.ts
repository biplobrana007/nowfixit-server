import { Router } from "express";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { serviceControllers } from "./service.controller";
import validateInput from "../../middleware/validiateInput";
import { serviceValidations } from "./service.validaton";

const router = Router();

router.post(
  "/",
  auth(Role.TECHNICIAN),
  validateInput(serviceValidations.createServiceValidation),
  serviceControllers.createService
);
router.get("/", serviceControllers.getAllService);

router.get(
  "/:id",
  validateInput(serviceValidations.getServiceByIdValidation),
  serviceControllers.getServiceById
);
router.patch(
  "/:id",
  auth(Role.TECHNICIAN),
  validateInput(serviceValidations.updateServiceValidation),
  serviceControllers.updateService
);
router.delete(
  "/:id",
  auth(Role.TECHNICIAN, Role.ADMIN),
  validateInput(serviceValidations.deleteServiceValidation),
  serviceControllers.deleteService
);

export const serviceRouter = router;
