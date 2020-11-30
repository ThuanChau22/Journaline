import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Profile from "./components/Profile";
import Page from "./components/Page";
import Compose from "./components/Compose";

import YourJournal from "./components/YourJournal";
import YourTitleList from "./components/YourTitleList";
import OtherUserEntry from "./components/OtherUserEntry";
import OtherUserTitleList from "./components/OtherUserTitleList";
import NotFound from "./components/NotFound";


function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  return (
    <Router>
      <Header isSignedIn={isSignedIn}
        setIsSignedIn={setIsSignedIn} />
      <Switch>
        <Route exact path="/signin"
          render={() => <Signin setIsSignedIn={setIsSignedIn} />} />

        <Route exact path="/" component={Home} />

        <Route exact path="/:userName" component={Profile} />

        <Route exact path="/:userName/compose" component={Compose} />

        <Route exact path="/:userName/:pageId" component={Page} />

        {/* <Route path="/compose" component={Compose} /> */}

        <Route path="/yourJournal" component={YourJournal} />
        <Route path="/yourtitlelist" component={YourTitleList} />

        <Route path="/otherusertitlelist" component={OtherUserTitleList} />
        <Route path="/otheruserentry" component={OtherUserEntry} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;