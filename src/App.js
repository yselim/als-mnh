import React from "react";
import { AppProvider } from "./AppContext";

import "./App.css";
import { withRouter } from "react-router-dom";
import RouteGenerator from "./config/RouteGenerator";
function App() {
  return (
    <AppProvider>
      <div className="App">
        <RouteGenerator />
      </div>
    </AppProvider>
  );
}

export default withRouter(App);
