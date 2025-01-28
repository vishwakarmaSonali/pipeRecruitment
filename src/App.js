import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Sourcing from "./pages/Tools/Sourcing/Sourcing";
import Client from "./pages/Recruitment/Client";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/sourcing" replace />,
  },
  {
    path: "/client",
    element: <Client />,
  },
  {
    path: "/sourcing",
    element: <Sourcing />,
  },
]);
const App = () => {
  return (
    <div className={`main-content`}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
