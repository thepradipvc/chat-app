import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { db } from "../db";
import { usersTable } from "../db/schema";
import { cookieOptions, generateToken } from "../lib/utils";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400);
      throw new Error("Please fill all the fields.");
    }

    const [userExists] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, username));

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    //   Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const [user] = await db
      .insert(usersTable)
      .values({
        username,
        password: hashedPassword,
      })
      .returning();

    // randomly select men or women & select image
    const gender = Math.random() > 0.5 ? "men" : "women";
    const imageUrl = `https://randomuser.me/api/portraits/${gender}/${user.id % 100}.jpg`;

    await db
      .update(usersTable)
      .set({ image: imageUrl })
      .where(eq(usersTable.id, user.id));

    const token = generateToken(user.id);

    res.cookie("auth_token", token, cookieOptions).status(201).json({
      id: user.id,
      username: user.username,
      token,
    });
  }
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, username));

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user.id);
    res.cookie("auth_token", token, cookieOptions).json({
      id: user.id,
      username: user.username,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

export const usernameAvailability = asyncHandler(
  async (req: Request, res: Response) => {
    const username = req.params.username;

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, username));

    if (user) {
      res.status(200).json({ available: false });
    }

    res.status(200).json({ available: true });
  }
);

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json(req.user);
});
