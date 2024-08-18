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

export const usernameAvailability = async (username: string) => {
  return await axios.get<{ available: boolean }>(
    `/api/users/availability/${username}`,
  );
};
