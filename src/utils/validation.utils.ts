import ThrowError from "./throwError";
import httpStatus from "http-status";

type FieldType = "string" | "number" | "boolean";

export const validateTypes = (
  body: Record<string, unknown>,
  fields: Record<string, FieldType>
): void => {
  for (const [field, expectedType] of Object.entries(fields)) {
    if (typeof body[field] !== expectedType) {
      throw new ThrowError(
        httpStatus.BAD_REQUEST,
        `${field} must be a ${expectedType}`
      );
    }
  }
};

export const validateRequiredFields = (
  body: Record<string, unknown>,
  requiredFields: string[]
): void => {
  for (const field of requiredFields) {
    const value = body[field];

    if (value === undefined || value === null || value === "") {
      throw new ThrowError(httpStatus.BAD_REQUEST, `${field} is required`);
    }
  }
};

export const validateStringLength = (
  fieldName: string,
  value: string,
  min: number,
  max: number
): void => {
  const trimmedValue = value.trim();

  if (trimmedValue.length < min) {
    throw new ThrowError(
      httpStatus.BAD_REQUEST,
      `${fieldName} must be at least ${min} characters`
    );
  }

  if (trimmedValue.length > max) {
    throw new ThrowError(
      httpStatus.BAD_REQUEST,
      `${fieldName} cannot exceed ${max} characters`
    );
  }
};

export const validateEmail = (email: string): void => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    throw new ThrowError(httpStatus.BAD_REQUEST, "Invalid email address");
  }
};

export const validatePassword = (password: string): void => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#^()_+\-=\[\]{};':"\\|,.<>\/?]).{6,100}$/;

  if (!passwordRegex.test(password)) {
    throw new ThrowError(
      httpStatus.BAD_REQUEST,
      "Password must be 6-100 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    );
  }
};

export const validateUUID = (fieldName: string, value: string): void => {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!uuidRegex.test(value)) {
    throw new ThrowError(
      httpStatus.BAD_REQUEST,
      `${fieldName} must be a valid UUID`
    );
  }
};

export const validatePositiveNumber = (
  fieldName: string,
  value: number
): void => {
  if (isNaN(value)) {
    throw new ThrowError(
      httpStatus.BAD_REQUEST,
      `${fieldName} must be a number`
    );
  }

  if (value <= 0) {
    throw new ThrowError(
      httpStatus.BAD_REQUEST,
      `${fieldName} must be greater than 0`
    );
  }
};

export const validateEnum = (
  fieldName: string,
  value: string,
  allowedValues: string[]
): void => {
  if (!allowedValues.includes(value)) {
    throw new ThrowError(
      httpStatus.BAD_REQUEST,
      `${fieldName} must be one of: ${allowedValues.join(", ")}`
    );
  }
};
