import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Signin from "./components/Signin";
import User from "./components/User";
import Page from "./components/Page";
import Error from "./components/Error";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/:username" component={User} />
        <Route exact path="/:username/:pageid" component={Page} />
        <Route component={Error} />
      </Switch>
    </Router>
  );
}

export default App;