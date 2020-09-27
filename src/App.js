import React from "react";

import "./App.css";
import { Redirect, Switch, withRouter, Route } from "react-router-dom";
import  Admin  from "./Components/pages/Admin";
function App() {
  const pageContent = (

    <Switch>
      {/* <Route key={"admin"} path={"/admin"} exact component={<Admin />} /> */}
      <Route key={"home"} path={"/"} exact component={Admin} />
      <Redirect to="/" />
    </Switch>
  );

    return <div className="App">{pageContent}</div>;
}

export default withRouter(App);
