import { Request } from "express";
import {
  validateEnum,
  validateUUID,
} from "../../utils/validation.utils";

const updateUserStatusValidation = (req: Request) => {
  const userId = req.params.id;
  const { status } = req.body;

  validateUUID("UserId", userId as string);

  validateEnum("UserStatus", status, ["ACTIVE", "BLOCKED"]);
};


export const adminValidatons = {
    updateUserStatusValidation
}