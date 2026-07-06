import { Role } from "../../generated/prisma/enums";
import { prisma } from "../lib/prisma";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { jwtUtils } from "../utils/jwt";
import ThrowError from "../utils/throwError";
import httpStatus from "http-status";
import config from "../config";

const auth = (...requiredRoles: Role[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken
      ? req.cookies.accessToken
      : req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization?.split(" ")[1]
      : req.headers.authorization;

    if (!token) {
      throw new ThrowError(
        httpStatus.UNAUTHORIZED,
        "You are not logged in. Please log in first!"
      );
    }

    const verifyToken = jwtUtils.verifyToken(token, config.jwt_access_secret);

    if (!verifyToken.success) {
      throw new ThrowError(
        httpStatus.UNAUTHORIZED,
        "Token verification failed!"
      );
    }

    const { email, name, id, role } = verifyToken.data as JwtPayload;

    if (!requiredRoles.includes(role)) {
      throw new ThrowError(httpStatus.FORBIDDEN, "Forbidden. No access!");
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
        name,
        email,
        role,
      },
    });

    if (!user) {
      throw new ThrowError(
        httpStatus.NOT_FOUND,
        "User not found. Please try again. "
      );
    }

    req.user = {
      email,
      name,
      id,
      role,
    };

    next();
  });
};
export default auth;
