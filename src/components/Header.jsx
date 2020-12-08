import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../css/Header.css";
import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import { Auth } from 'aws-amplify';
import {
  checkUser,
  signOut
} from "../js/authentication";


function Header(props) {
  const history = useHistory();
  const [userName, updateUserName] = useState("");

  useEffect(() => {
    fetchUser();
  });

  async function fetchUser() {
    //Check user sign in status
    const message = await checkUser();
    if (message === "") {
      props.setIsSignedIn(true);
      //Get username
      const user = await Auth.currentAuthenticatedUser();
      updateUserName(user.username);
    } else {
      if (!window.location.href.includes("signin")) {
        history.push("/signin");
      }
    }
  }

  async function submit(e) {
    e.preventDefault();
    //Call Sign Out
    const message = await signOut();
    if (message === "") {
      props.setIsSignedIn(false);
      history.push("/signin");
    }
  }

  return (
    <div className="header">
      <Navbar collapseOnSelect expand="lg" variant="dark" >
        <LinkContainer to="/">
          <Navbar.Brand >Journaline</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          {props.isSignedIn &&
            <Nav>
              <LinkContainer to={"/" + userName}>
                <Nav.Link variant="info">{userName}</Nav.Link>
              </LinkContainer>
              <Nav.Link variant="info" onClick={submit}>Sign Out</Nav.Link>
            </Nav>
          }
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}


export default Header;