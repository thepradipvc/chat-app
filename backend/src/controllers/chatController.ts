import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import { db } from "../db";

export const getAllConversations = AsyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user!;

    const userConversations = await db.query.usersConversationsTable.findMany({
      where: (uc, { eq }) => eq(uc.userId, user.id),
      with: {
        conversation: {
          with: {
            usersConversationsTable: {
              where: (uc, { ne }) => ne(uc.userId, user.id),
              with: {
                user: {
                  columns: { password: false },
                },
              },
            },
            messages: {
              orderBy: (m, { desc }) => [desc(m.createdAt), desc(m.id)],
              limit: 1,
            },
          },
        },
      },
    });

    const cleanedConversations = userConversations.map((conversation) => ({
      conversationId: conversation.conversationId,
      user: conversation.conversation.usersConversationsTable[0].user,
      lastMessage: conversation.conversation.messages[0],
    }));

    res.json(cleanedConversations);
  }
);

export const getMessages = AsyncHandler(async (req: Request, res: Response) => {
  const user = req.user!;
  const conversationId = Number(req.params.conversationId);
  const cursor = Number(req.query.cursor) || null;
  const pageSize = 20;

  const conversation = await db.query.usersConversationsTable.findFirst({
    where: (uc, { and, eq }) =>
      and(eq(uc.conversationId, conversationId), eq(uc.userId, user.id)),
  });

  if (!conversation) {
    res.status(401);
    throw new Error("Not Authorised");
  }

  const messages = await db.query.messagesTable.findMany({
    where: (m, { eq, lt, and }) =>
      and(
        eq(m.conversationId, conversationId),
        cursor ? lt(m.id, cursor) : undefined
      ),
    limit: pageSize,
    orderBy: (m, { desc }) => [desc(m.createdAt), desc(m.id)],
  });

  res.json({
    messages,
    nextCursor:
      messages.length === pageSize
        ? messages[messages.length - 1].id
        : undefined,
  });
});

export const getOtherUserInConversation = AsyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user!;
    const conversationId = Number(req.params.conversationId);

    const conversation = await db.query.conversationsTable.findFirst({
      where: (c, { eq }) => eq(c.id, conversationId),
      with: {
        usersConversationsTable: {
          where: (uc, { ne }) => ne(uc.userId, user.id),
          with: {
            user: { columns: { password: false } },
          },
        },
      },
    });

    if (!conversation) {
      res.status(400);
      throw new Error("No conversation found");
    }

    const otherUser = conversation?.usersConversationsTable[0]?.user;

    if (!otherUser) {
      res.status(400);
      throw new Error("No other user in the conversation");
    }

    res.json(otherUser);
  }
);
