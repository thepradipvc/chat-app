import { Message, User } from "@/lib/types";
import axios from "axios";

export const getAllConversations = async () => {
  const res =
    await axios.get<
      { conversationId: number; user: User; lastMessage: Message }[]
    >("/api/chats");

  return res.data;
};

export const getMessages = async ({
  conversationId,
  cursor,
}: {
  conversationId: number;
  cursor: number;
}) => {
  const res = await axios.get<{
    messages: Message[];
    nextCursor: number | undefined;
  }>(`/api/chats/messages/${conversationId}?cursor=${cursor}`);

  return res.data;
};

export const getOtherUserInConversation = async ({
  conversationId,
}: {
  conversationId: number;
}) => {
  const res = await axios.get<User>(`/api/chats/${conversationId}/users`);

  return res.data;
};
