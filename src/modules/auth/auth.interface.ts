import { Role } from "../../../generated/prisma/enums";

export interface IRegisterUserPayload {
  name: string;
  email: string;
  password: string;
  role: Role;
  profilePhoto?: string;
}

export interface ILoginUserPaylod {
  email: string;
  password: string;
}
