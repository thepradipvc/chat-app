import {
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

export const conversationsTable = pgTable("conversations", {
  id: serial("id").primaryKey(),
  name: varchar("name"),
  conversationType: varchar("conversation_type").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const usersConversationsTable = pgTable("users_conversations", {
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  conversationId: integer("conversation_id")
    .notNull()
    .references(() => conversationsTable.id),
});

export const messageSeenStatusTable = pgTable("message_seen_status", {
  id: serial("id").primaryKey(),
  messageId: integer("message_id")
    .notNull()
    .references(() => messagesTable.id),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  seenAt: timestamp("seen_at").defaultNow(),
});
