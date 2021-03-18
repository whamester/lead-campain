import * as React from "react";
import { Route } from "react-router-dom";
import Signup from "../pages/signup";
import About from "../pages/about";

const routes = [
  <Route exact path="/signup" component={Signup} noLayout />,

  <Route exact path="/about" component={About} />,
];
export default routes;
