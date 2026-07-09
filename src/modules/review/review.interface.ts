export interface ICreateReviewPayload {
  rating: number;
  comment?: string;
  bookingId: string;
}

export interface IUpdateReviewPayload {
  rating?: number;
  comment?: string;
}
