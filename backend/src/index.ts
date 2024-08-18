import cookieParser from "cookie-parser";
import dotEnv from "dotenv";
import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";

import userRouter from "./routes/userRouter";
import chatRouter from "./routes/chatRouter";
import errorHandler from "./middlewares/errorMiddleware";

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

dotEnv.config({
  path: path.join(__dirname, "../../.env"),
});

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/chats", chatRouter);

// Serve static files from the frontend in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../../frontend/dist");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => res.send("Please set to production mode"));
}

app.use(errorHandler);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
