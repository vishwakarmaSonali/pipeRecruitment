import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import CollapsibleDrawer from "./components/Drawer/CollapsibleDrawer";

const App = () => {
  return (
    <Router>
      <CollapsibleDrawer />
    </Router>
  );
};

export default App;
