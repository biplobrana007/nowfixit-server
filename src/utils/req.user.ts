import { Role } from "../../generated/prisma/enums";

export interface ReqUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}

declare global {
  namespace Express {
    interface Request {
      user?: ReqUser;
    }
  }
}
