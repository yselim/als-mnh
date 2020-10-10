import React from "react";
import { AppProvider } from "./AppContext";

import "./App.css";
import { Redirect, Switch, withRouter, Route } from "react-router-dom";
import Admin from "./Components/pages/Admin";
function App() {
  const pageContent = (
    <Switch>
      {/* <Route key={"admin"} path={"/admin"} exact component={<Admin />} /> */}
      <Route key={"home"} path={"/"} exact component={Admin} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <AppProvider>
      <div className="App">{pageContent}</div>
    </AppProvider>
  );
}

export default withRouter(App);
