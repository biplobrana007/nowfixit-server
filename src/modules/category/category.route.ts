import { Router } from "express";
import { categoryControllers } from "./category.controller";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/", auth(Role.ADMIN), categoryControllers.createCategory);
router.get("/", categoryControllers.getAllCategory);
router.patch("/:id", auth(Role.ADMIN), categoryControllers.updateCategory);
router.delete("/:id", auth(Role.ADMIN), categoryControllers.deleteCategory);

export const categoryRouter = router;
