import { io } from "..";

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("message", (message) => {
    console.log("message: " + message);
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Emit to all other users
// io.on("connection", (socket) => {
//   socket.on("message", (message) => {
//     socket.broadcast.emit("message", message);
//   });
// });
