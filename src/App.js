import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header/Header";
import Sourcing from "./pages/Tools/Sourcing/Sourcing";
import Client from "./pages/Recruitment/Client";
import "./App.css";

const getTitle = (pathname) => {
  switch (pathname) {
    case "/client":
      return "Client Management";
    case "/sourcing":
      return "Sourcing Hub";
    default:
      return "Recruitment Portal";
  }
};

const router = createBrowserRouter([
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  return (
    <div className={`main-content`}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
