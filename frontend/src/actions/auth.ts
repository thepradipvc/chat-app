import { User } from "@/lib/types";
import axios from "axios";

export const loginAction = async (loginInfo: {
  username: string;
  password: string;
}) => {
  return await axios.post("/api/users/login", loginInfo);
};

export const registerAction = async (registerInfo: {
  username: string;
  password: string;
}) => {
  return await axios.post("/api/users/register", registerInfo);
};

export const getMe = async () => {
  const res = await axios.get<User>("/api/users/me");
  return { isLoggedIn: res.status === 200, user: res.data };
};

export const usernameAvailability = async (username: string) => {
  return await axios.get<{ available: boolean }>(
    `/api/users/availability/${username}`,
  );
};
