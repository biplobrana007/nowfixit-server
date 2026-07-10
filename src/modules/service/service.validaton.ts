import { Request } from "express";
import {
  validatePositiveNumber,
  validateRequiredFields,
  validateStringLength,
  validateTypes,
  validateUUID,
} from "../../utils/validation.utils";

const createServiceValidation = (req: Request) => {
  const { title, description, price, duration, categoryId } = req.body;

  validateRequiredFields(req.body, [
    "title",
    "description",
    "price",
    "duration",
    "categoryId",
  ]);

  validateTypes(req.body, {
    title: "string",
    description: "string",
    price: "string",
    duration: "number",
    categoryId: "string",
  });

  validatePositiveNumber("Price", Number(price));
  validatePositiveNumber("Duration", duration);
  validateStringLength("Description", description, 20, 150);
  validateStringLength("Title", title, 5, 50);

  validateUUID("CategoryId", categoryId);
};
const getServiceByIdValidation = (req: Request) => {
  const serviceId = req.params.id;
  validateUUID("ServiceId", serviceId as string);
};
const updateServiceValidation = (req: Request) => {
  const serviceId = req.params.id;

  validateUUID("ServiceId", serviceId as string);
};
const deleteServiceValidation = (req: Request) => {
  const serviceId = req.params.id;
  validateUUID("ServiceId", serviceId as string);
};

export const serviceValidations = {
  createServiceValidation,
  getServiceByIdValidation,
  updateServiceValidation,
  deleteServiceValidation,
};
