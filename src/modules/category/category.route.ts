import { Router } from "express";
import { categoryControllers } from "./category.controller";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import validateInput from "../../middleware/validiateInput";
import { categoryValidations } from "./category.validation";

const router = Router();

router.post(
  "/",
  auth(Role.ADMIN),
  validateInput(categoryValidations.creteCategoryValidation),
  categoryControllers.createCategory
);

router.get("/", categoryControllers.getAllCategory);

router.patch(
  "/:id",
  auth(Role.ADMIN),
  validateInput(categoryValidations.updateCategoryValidation),
  categoryControllers.updateCategory
);

router.delete(
  "/:id",
  auth(Role.ADMIN),
  validateInput(categoryValidations.deleteCategoryValidation),
  categoryControllers.deleteCategory
);

export const categoryRouter = router;
