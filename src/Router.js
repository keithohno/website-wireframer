import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import RegisterScreen from "./components/RegisterScreen";
import ListScreen from "./components/ListScreen";
import CanvasRoot from "./components/CanvasRoot";
import Tester from "./Tester";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SplashScreen} />
        <Route exact path="/register" component={RegisterScreen} />
        <Route exact path="/wf" component={ListScreen} />
        <Route path="/wf/:index" component={CanvasRoot} />
        <Route path="/test" component={Tester} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
