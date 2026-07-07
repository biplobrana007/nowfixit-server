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
