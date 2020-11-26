import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Auth } from 'aws-amplify';
import {
  checkUser,
  signOut
} from "../js/authentication";


function Home() {
  const history = useHistory();
  const [userName, updateUserName] = useState("");

  //Check user sign in status
  checkUser().then((message) => {
    if (message === "") {
      Auth.currentAuthenticatedUser().then((user) => {
        updateUserName(user.username);
      });
    } else {
      history.push("/signin");
    }
  });

  function submit(e) {
    e.preventDefault();
    //Call Sign Out
    signOut().then((message) => {
      if (message === "") {
        history.push("/signin");
      }
    });
  }

  return (
    <div>
      <h3>Welcome, {userName}</h3>
      <Link to="/signin">Signin</Link>
      <form method="post" onSubmit={submit}>
        <input type="submit" name="userName" value="Sign Out" />
      </form>
    </div>
  );
}

export default Home;
