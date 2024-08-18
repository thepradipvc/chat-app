import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username").unique().notNull(),
  password: varchar("password").notNull(),
  image: varchar("image").default("/default.jpg").notNull(),
  lastActive: timestamp("last_active").defaultNow().notNull(),
});

export const userRelations = relations(usersTable, ({ one, many }) => ({
  messages: many(messagesTable),
  usersConversationsTable: many(usersConversationsTable),
  messagesSeenStatus: many(messageSeenStatusTable),
}));

export const messagesTable = pgTable("messages", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  imageUrl: varchar("image_url"),
  videoUrl: varchar("video_url"),
  senderId: integer("sender_id")
    .notNull()
    .references(() => usersTable.id),
  conversationId: integer("conversation_id")
    .notNull()
    .references(() => conversationsTable.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const messageRelations = relations(messagesTable, ({ one }) => ({
  sender: one(usersTable, {
    fields: [messagesTable.senderId],
    references: [usersTable.id],
  }),
  conversation: one(conversationsTable, {
    fields: [messagesTable.conversationId],
    references: [conversationsTable.id],
  }),
}));

export const conversationsTable = pgTable("conversations", {
  id: serial("id").primaryKey(),
  name: varchar("name"),
  conversationType: varchar("conversation_type").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const conversationRelations = relations(
  conversationsTable,
  ({ many }) => ({
    messages: many(messagesTable),
    usersConversationsTable: many(usersConversationsTable),
    messageSeenStatus: many(messageSeenStatusTable),
  })
);

export const usersConversationsTable = pgTable("users_conversations", {
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  conversationId: integer("conversation_id")
    .notNull()
    .references(() => conversationsTable.id),
});

export const userConversationsRelations = relations(
  usersConversationsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [usersConversationsTable.userId],
      references: [usersTable.id],
    }),
    conversation: one(conversationsTable, {
      fields: [usersConversationsTable.conversationId],
      references: [conversationsTable.id],
    }),
  })
);

export const messageSeenStatusTable = pgTable("message_seen_status", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id")
    .notNull()
    .references(() => conversationsTable.id),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  seen: boolean("seen").default(false).notNull(),
});

export const messageSeenStatusRelations = relations(
  messageSeenStatusTable,
  ({ one }) => ({
    conversation: one(conversationsTable, {
      fields: [messageSeenStatusTable.conversationId],
      references: [conversationsTable.id],
    }),
    user: one(usersTable, {
      fields: [messageSeenStatusTable.userId],
      references: [usersTable.id],
    }),
  })
);
