import React from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import config from "./config";
import CreateNFT from "./pages/CreateNFT";
import LandingPage from "./pages/LandingPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={config.routes.root} component={LandingPage} exact />
        <Route path={config.routes.create} component={CreateNFT} />
      </Switch>
    </BrowserRouter>
  );
}
