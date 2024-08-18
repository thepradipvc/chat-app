import { CookieOptions } from "express";
import jwt from "jsonwebtoken";

// Generate JWT
export const generateToken = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "jwtsecret", {
    expiresIn: "30d",
  });
};

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
};
