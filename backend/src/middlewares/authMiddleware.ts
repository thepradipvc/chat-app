import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { usersTable } from "../db/schema";
import { db } from "../db";
import { eq } from "drizzle-orm";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        username: string;
        image: string;
        lastActive: Date;
      };
    }
  }
}

const authMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (req.cookies?.auth_token) {
      try {
        // Get token from cookie
        token = req.cookies.auth_token;

        // Verify token
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET || "jwtsecret"
        ) as { id: number };

        // Get user from the token
        const user = await db.query.usersTable.findFirst({
          where: eq(usersTable.id, decoded.id),
          columns: {
            password: false,
          },
        });

        if (!user) {
          res.status(401);
          throw new Error("Not authorised");
        }

        req.user = user;

        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorised");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorised");
    }
  }
);

export default authMiddleware;
