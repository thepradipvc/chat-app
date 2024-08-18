import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import {
  registerUser,
  loginUser,
  getMe,
  usernameAvailability,
} from "../controllers/userController";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getMe);
router.get("/availability/:username", usernameAvailability);

export default router;
