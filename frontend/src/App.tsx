import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Home from "./pages/Home";
import ErrorPage from "./error-page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/Login";
import ChatsHome from "./pages/ChatsHome";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";
import Inbox from "./pages/Inbox";
import Chat from "./pages/Chat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/chat",
    element: (
      <ProtectedRoute>
        <Inbox />
      </ProtectedRoute>
    ),
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <ChatsHome />
              </ProtectedRoute>
            ),
          },
          {
            path: "/chat/:id",
            element: (
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();

const Router = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Router;
