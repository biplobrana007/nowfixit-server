import { Router } from "express";
import { technicianControllers } from "./technician.controller";


const router = Router();

router.get("/",technicianControllers.getAllTechnicians)
router.get("/:id",technicianControllers.getTechniciansById)

export const technicianRouter = router;
