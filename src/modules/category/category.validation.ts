import { Request } from "express";
import {
  validateRequiredFields,
  validateTypes,
  validateUUID,
} from "../../utils/validation.utils";

const creteCategoryValidation = (req: Request) => {
  const { categoryName } = req.body;

  validateRequiredFields(req.body, ["categoryName"]);

  validateTypes(req.body, { categoryName: "string" });
};

const updateCategoryValidation = (req: Request) => {
  const categoryId = req.params.id;

  validateUUID("CategoryId", categoryId as string);
};

const deleteCategoryValidation = (req: Request) => {
  const categoryId = req.params.id;

  validateUUID("CategoryId", categoryId as string);
};

export const categoryValidations = {
  creteCategoryValidation,
  updateCategoryValidation,
  deleteCategoryValidation,
};
