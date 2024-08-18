import cookie from "cookie";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { db } from "../db";
import { usersTable } from "../db/schema";

declare module "socket.io" {
  interface Socket {
    user?: {
      id: number;
      username: string;
      image: string;
      lastActive: Date;
    };
  }
}

const socketAuthMiddleware = async (
  socket: Socket,
  next: (err?: ExtendedError) => void
) => {
  try {
    const cookieHeader = socket.handshake.headers.cookie;
    if (!cookieHeader) {
      return next(new Error("Unauthorised"));
    }

    const parsedCookies = cookie.parse(cookieHeader);
    const token = parsedCookies.auth_token;
    if (!token) {
      return next(new Error("Unauthorised"));
    }

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
      return next(new Error("Unauthorised"));
    }

    socket.user = user;

    next();
  } catch (error) {
    return next(new Error("Unauthorised"));
  }
};

export default socketAuthMiddleware;
