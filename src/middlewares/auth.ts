import { Request } from "express";
import { verifyToken } from "../utils/jwt";

export const expressAuthentication = async (
  request: Request,
  securityName: string,
  scopes?: string[]
): Promise<any> => {
  if (securityName === "jwt") {
    const token = request.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("No token provided");
    }

    try {
      const decoded = verifyToken(token);
      return decoded;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }

  throw new Error("Security method not implemented");
};