import { ServiceWhereInput } from "../../../generated/prisma/models";

export interface ICreateServicePayload {
  title: string;
  description: string;
  price: string;
  duration: number;
  categoryId: string;
}
export interface IUpdateServicePayload {
  title?: string;
  description?: string;
  price?: string;
  duration?: number;
  categoryId?: string;
  isAvailable?: boolean;
}

export interface IServiceQuery extends ServiceWhereInput {
  type?: string;
  location?: string;
  rating?: number;
}

export interface FilteredService extends ServiceWhereInput {
  averageRating?: number;
}
