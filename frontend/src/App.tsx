import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatBox from "./pages/Chat";
import Home from "./pages/Home";
import Inbox from "./pages/Inbox";
import ErrorPage from "./error-page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/Login";
import ChatsHome from "./pages/ChatsHome";

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
    element: <ChatBox />,
    children: [
      {
        element: <ChatsHome />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <ErrorPage />,
          },
          {
            path: "/chat/:id",
            element: <Inbox />,
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
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default Router;
