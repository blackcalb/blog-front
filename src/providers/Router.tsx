import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/home";
import SignUp from "../pages/auth/sign-up";
import SignIn from "../pages/auth/sign-in";
import NewPost from "@/pages/NewPost";
import { EditPost } from "@/pages/EditPost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/sign-up",
    element: <SignUp />,
  },
  {
    path: "/auth/sign-in",
    element: <SignIn />,
  },
  {
    path: "/new-post",
    element: <NewPost />,
  },
  {
    path: "/post/:postId",
    element: <div>post detail</div>,
  },
  {
    path: "/post/:postId/edit",
    element: <EditPost />,
  },
  {
    path: "/post/:postId/delete-confirm",
    element: <div>post detail</div>,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
