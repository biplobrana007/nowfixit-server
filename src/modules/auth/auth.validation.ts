import { Request } from "express";

import {
  validateEmail,
  validateEnum,
  validatePassword,
  validateRequiredFields,
  validateStringLength,
  validateTypes,
} from "../../utils/validation.utils";

const registerValidation = (req: Request) => {
  const { name, email, password, role } = req.body;

  // requred field validation
  validateRequiredFields(req.body, ["name", "email", "password", "role"]);

  // type validation
  validateTypes(req.body, {
    name: "string",
    email: "string",
    password: "string",
    role: "string",
  });

  // length validation
  validateStringLength("Name", name, 2, 30);

  // email
  validateEmail(email);

  // password
  validatePassword(password);

  // role
  validateEnum("Role", role, ["CUSTOMER", "TECHNICIAN"]);
};
const loginValidation = (req: Request) => {
  const { email, password } = req.body;

  // requred field validation
  validateRequiredFields(req.body, ["email", "password"]);

  // type validation
  validateTypes(req.body, {
    email: "string",
    password: "string",
  });

  // email
  validateEmail(email);

//   // password
//   validatePassword(password);
};

export const authValidations = {
  registerValidation,
  loginValidation,
};
