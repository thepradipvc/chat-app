import { io } from "..";
import socketAuthMiddleware from "../middlewares/socketAuthMiddleware";

io.use(socketAuthMiddleware);

io.on("connection", (socket) => {
  console.log("A user connected", socket.user);

  // Join a specific room
  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`User joined room ${roomId}`);
  });

  // Handle message sending
  socket.on("send_message", async (messageData) => {
    // const newMessage = await sendMessage(messageData);
    // Broadcast message to all users in the room
    // socket.broadcast.to(messageData.conversationId).emit("receive_message", newMessage);
    // Mark conversation as unread for other users
    // await markAsUnread(messageData.conversationId, messageData.senderId);
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});
