import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginPage from "../Components/pages/LoginPage";
import AdminPage from "../Components/pages/AdminPage";
import ReportPage from "../Components/pages/ReportPage";
import { ROLLER } from "../constants";
import AppContext from "../AppContext";
import NursePage from "../Components/pages/NursePage";

// Oturum açan kullanıcı var mı, varsa talep edilen sayfa için yetkisi var mı vs kontrol eder ve uygun bir rota oluşturur.

const urls = {
  home: {
    path: "/",
    component: LoginPage,
    everybodyCanAccess: true,
  },
  login: {
    path: "/login",
    component: LoginPage,
    everybodyCanAccess: true,
  },
  admin: {
    path: "/admin",
    component: AdminPage,
    permittedRoles: [ROLLER.admin.id],
  },
  nurse:{
    path: "/nurse",
    component: NursePage,
    permittedRoles: [ROLLER.hemsire.id],
  },
  report: {
    path: "/report/:uid",
    component: ReportPage,
    permittedRoles: [ROLLER.admin.id, ROLLER.hemsire.id, ROLLER.hoca.id],
  },
};

class RouteGenerator extends Component {
  static contextType = AppContext;

  render() {
    
    const user = this.context.loggedOnUser;

    return (
      <Switch>
        {Object.keys(urls).map((key,i) => {
          const urlObject = urls[key];
          const thisRoleCanAccess =
          user && urlObject.permittedRoles && 
            urlObject.permittedRoles.includes(user.rol);

         
            return (
              <Route
                key={key}
                path={urlObject.path}
                exact
                component={(thisRoleCanAccess || urlObject.everybodyCanAccess)? urlObject.component : LoginPage}
              />
            );
          
          
        })}

        {/* <Redirect to="/" /> */}
      </Switch>
    );
  }
}

export default RouteGenerator;
