import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home"
import Signin from "./components/Signin"
import Error from "./components/Error"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={Signin} />
        <Route component={Error} />
      </Switch>
    </Router>
  );
}

export default App;