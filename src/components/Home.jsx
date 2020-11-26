import React, { useEffect, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { checkUser, signOut } from "../js/authentication";
import { Auth } from 'aws-amplify';

function SignOut(props) {
  function submit(e) {
    e.preventDefault();
    signOut().then((message) => {
      if (message === "") {
        props.updateIsSignin(false);
      }
    });
  }

  if (!props.isSignin) {
    return <Redirect to="/signin" />;
  }

  return (
    <div>
      <form method="post" onSubmit={submit}>
        <input type="submit" name="userName" value="Sign Out" />
      </form>
    </div>
  );
}

function Home() {
  const [isSignin, updateIsSignin] = useState(true);
  const [userName, updateUserName] = useState("");
  checkUser().then((message) => {
    if (message === "") {
      updateIsSignin(true);
    } else {
      updateIsSignin(false);
    }
  });

  useEffect(() => {
    if (isSignin) {
      Auth.currentAuthenticatedUser().then((user) => {
        updateUserName(user.username);
      });
    }
  });

  return (
    <div>
      <h3>Welcome, {userName}</h3>
      <Link to="/signin">Signin</Link>
      <SignOut isSignin={isSignin} updateIsSignin={updateIsSignin} />
    </div>
  );
}

export default Home;
