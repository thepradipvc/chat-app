import { getMe } from "@/actions/auth";
import { User } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | undefined;
  socket: Socket | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data, isPending: isLoading } = useQuery({
    queryKey: ["authStatus"],
    queryFn: getMe,
    staleTime: 1000 * 30,
    retry: false,
  });
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (data?.isLoggedIn && !socket) {
      const newSocket = io("/socket.io", {
        withCredentials: true,
      });

      setSocket(newSocket);

      newSocket.emit("join_room", 44);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [data?.isLoggedIn, socket]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!data?.isLoggedIn,
        isLoading,
        user: data?.user,
        socket,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
