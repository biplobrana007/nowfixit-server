import { prisma } from "../../lib/prisma";
import ThrowError from "../../utils/throwError";
import { ICreateCategoryPayload } from "./category.interface";
import httpStatus from "http-status";

const createCategoryIntoDB = async (payload: ICreateCategoryPayload) => {
  const isCategoryExist = await prisma.category.findMany({
    where: { categoryName: payload.categoryName },
  });

  if (isCategoryExist.length !== 0) {
    throw new ThrowError(
      httpStatus.BAD_REQUEST,
      "Category name already exist. Please try another!"
    );
  }
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

const updateCategoryIntoDB = async () => {};

const deleteCategoryFromDB = async () => {};

export const categoryServices = {
  createCategoryIntoDB,
  getAllCategoryFromDB,
  updateCategoryIntoDB,
  deleteCategoryFromDB,
};
