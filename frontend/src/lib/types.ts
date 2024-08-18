export type User = {
  id: number;
  username: string;
  image: string;
  lastActive: string;
};

export type Message = {
  id: number;
  text: string;
  imageUrl: string | null;
  videoUrl: string | null;
  senderId: number;
  createdAt: Date;
  conversationId: number;
};
