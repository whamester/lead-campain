import * as React from "react";
import { Route } from "react-router-dom";
import Signup from "../pages/signup";

const routes = [<Route exact path="/signup" component={Signup} noLayout />];
export default routes;
