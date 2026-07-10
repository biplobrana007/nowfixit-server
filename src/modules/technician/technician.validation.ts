import { Request } from "express";
import { validateUUID } from "../../utils/validation.utils";

const getTechnicianById = (req: Request) => {
  const technicianId = req.params.id;
  validateUUID("TechnicianId", technicianId as string);
};


export const technicianValidations = {
  getTechnicianById,
 
};
