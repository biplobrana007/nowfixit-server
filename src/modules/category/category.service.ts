import { prisma } from "../../lib/prisma";
import {
  ICreateCategoryPayload,
  IUpdateCategoryPayload,
} from "./category.interface";

const createCategoryIntoDB = async (payload: ICreateCategoryPayload) => {
  const createdCategory = await prisma.category.create({
    data: {
      categoryName: payload.categoryName,
    },
  });

  return createdCategory;
};

const getAllCategoryFromDB = async () => {
  const categories = await prisma.category.findMany();
  return categories;
};

const updateCategoryIntoDB = async (
  categoryId: string,
  payload: IUpdateCategoryPayload
) => {
  const updatedCategory = await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: {
      categoryName: payload.categoryName,
    },
  });

  return updatedCategory;
};

const deleteCategoryFromDB = async (categoryId: string) => {
  await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });
};

export const categoryServices = {
  createCategoryIntoDB,
  getAllCategoryFromDB,
  updateCategoryIntoDB,
  deleteCategoryFromDB,
};
