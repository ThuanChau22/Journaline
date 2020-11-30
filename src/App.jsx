import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/Home"
import Signin from "./components/Signin"
import User from "./components/User";
import Page from "./components/Page";

import ComposeJournal from "./components/ComposeJournal";
import YourJournal from "./components/YourJournal";
import YourTitleList from "./components/YourTitleList";
import OtherUserEntry from "./components/OtherUserEntry";
import OtherUserTitleList from "./components/OtherUserTitleList";
import NotFound from "./components/NotFound";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/:username" component={User} />
        <Route exact path="/:username/:pageid" component={Page} />

        <Route path="/yourJournal" component={YourJournal} />
        <Route path="/yourtitlelist" component={YourTitleList} />
        <Route path="/composeJournal" component={ComposeJournal} />
        <Route path="/otherusertitlelist" component={OtherUserTitleList} />
        <Route path="/otheruserentry" component={OtherUserEntry} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;