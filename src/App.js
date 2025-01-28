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
import Candidates from "./pages/Recruitment/Candidates/Candidates";

const getTitle = (pathname) => {
  switch (pathname) {
    case "/client":
      return "Client Management";
    case "/sourcing":
      return "Sourcing Hub";
    case "/candidates":
      return "Candidates";
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
          <Route
            path="/candidates"
            element={<Candidates isDrawerOpen={isDrawerOpen} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
