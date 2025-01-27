import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header/Header";
import Sourcing from "./pages/Tools/Sourcing/Sourcing";
import Client from "./pages/Recruitment/Client";

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

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  return (
    <Router>
      <Header
        title={getTitle(window.location.pathname)}
        setDrawerState={setIsDrawerOpen}
      />
      <div className="flex" style={{ width: "100%" }}>
        <Routes>
          <Route
            path="/client"
            element={<Client isDrawerOpen={isDrawerOpen} />}
          />
          <Route
            path="/sourcing"
            element={<Sourcing isDrawerOpen={isDrawerOpen} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
