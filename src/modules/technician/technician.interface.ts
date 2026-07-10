import { UserWhereInput } from "../../../generated/prisma/models";

export interface IUpdateTechnicianProfilePayload {
  name?: string;
  bio?: string;
  experience?: number;
  location?: string;
  profilePhoto?: string;
}

export interface ITechnicianQuery extends UserWhereInput {
  searchTerm?: string;
}
 