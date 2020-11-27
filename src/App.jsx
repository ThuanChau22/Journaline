import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home"
import Signin from "./components/Signin"
// import Error from "./components/Error"

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
        <Route path="/signin" component={Signin} />
        <Route path="/yourJournal" component={YourJournal} />
        <Route path="/yourtitlelist" component={YourTitleList} />
        <Route path="/composeJournal" component={ComposeJournal} />
        <Route path="/otherusertitlelist" component={OtherUserTitleList} />
        <Route path="/otheruserentry" component={OtherUserEntry} />
        <Route component={NotFound} />
        {/* <Route component={Error} /> */}
      </Switch>
    </Router>
  );
}

// export default function Routes() {
//   return (
//     <Switch>
//       <Route exact path="/">
//         <Home />
//       </Route>
//       <Route exact path="/signin">
//        <Signin />
//        </Route>
//       <Route exact path="/homepage">
//         <Homepage />
//       </Route>
//       <Route exact path="/yourJournal">
//         <YourJournal />
//       </Route>
//       <Route exact path="/yourtitlelist">
//         <YourTitleList />
//       </Route>
//        <Route exact path="/composeJournal">
//         <ComposeJournal />
//         </Route>
//       <Route exact path="/otherusertitlelist">
//         <OtherUserTitleList />
//       </Route>
//         <Route exact path="/otheruserentry">
//         <OtherUserEntry />
//         </Route>
//         <Route>
//           <NotFound />
//         </Route>
//     </Switch>
//   );
// }

export default App;