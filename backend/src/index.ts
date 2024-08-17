import express from "express";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import dotEnv from "dotenv";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

dotEnv.config({
  path: path.join(__dirname, "../../.env"),
});

const port = process.env.PORT || 3000;

app.get("/api/some-data", (req, res) => {
  res.json({ message: process.env.DATABASE_URL + " hello" || "NOT AVAILABLE" });
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Serve static files from the frontend in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../../frontend/dist");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
