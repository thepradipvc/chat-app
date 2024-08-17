import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatBox from "./pages/Chat";
import Home from "./pages/Home";
import Inbox from "./pages/Inbox";
import ErrorPage from "./error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/chat",
    element: <ChatBox />,
    children: [
      {
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

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
