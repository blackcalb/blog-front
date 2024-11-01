import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Posts";
import SignUp from "../pages/auth/sign-up";
import SignIn from "../pages/auth/sign-in";
import NewPost from "@/pages/NewPost";
import { EditPost } from "@/pages/EditPost";
import { Post } from "@/pages/Post";
import DeletePost from "@/pages/DeletePost";
import NewComment from "@/pages/NewComment";
import { EditComment } from "@/pages/EditComment";
import DeleteComment from "@/pages/DeleteComment";

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
  //TODO: protect urls
  {
    path: "/new-post",
    element: <NewPost />,
  },
  {
    path: "/post/:postId",
    element: <Post />,
  },
  {
    path: "/post/:postId/edit",
    element: <EditPost />,
  },
  {
    path: "/post/:postId/confirm-delete",
    element: <DeletePost />,
  },
  {
    path: "/post/:postId/new-comment",
    element: <NewComment />,
  },
  {
    path: "/post/:postId/comment/:commentId/edit",
    element: <EditComment />,
  },
  {
    path: "/post/:postId/comment/:commentId/confirm_delete",
    element: <DeleteComment />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
