import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const createToken = (
  payload: JwtPayload,
  secrect: string,
  expiresIn: SignOptions
) => {
  const token = jwt.sign(payload, secrect, {
    expiresIn,
  } as SignOptions);

  return token;
};

const verifyToken = (token: string, secrect: string) => {
  try {
    const verifiedToken = jwt.verify(token, secrect);
    return {
      success: true,
      data: verifiedToken,
    };
  } catch (error) {
    console.log("Token verification failed", error);
    return {
      success: false,
      error: (error as Error).message,
    };
  }
};

export const jwtUtils = {
  createToken,
  verifyToken,
};
