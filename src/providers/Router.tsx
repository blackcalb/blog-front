import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/home";
import SignUp from "../pages/auth/sign-up";
import SignIn from "../pages/auth/sign-in";

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
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
