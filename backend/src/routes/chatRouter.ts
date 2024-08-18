import express from "express";
import {
  getAllConversations,
  getMessages,
  getOtherUserInConversation,
} from "../controllers/chatController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, getAllConversations);
router.get("/messages/:conversationId", authMiddleware, getMessages);
router.get(
  "/:conversationId/users",
  authMiddleware,
  getOtherUserInConversation
);

export default router;
