import { useRoutes, Navigate } from "react-router-dom";
import Home from "../Pages/Home";

function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Navigate to="/dashboard" />,
    },
    {
      path: "/dashboard/",
      element: <Home />,
    },
  ]);
}

export default Router;
