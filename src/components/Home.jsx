import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import "../css/Homepage.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import { Auth } from 'aws-amplify';
import {
  checkUser,
  signOut
} from "../js/authentication";

export default function Homepage() {
  const history = useHistory();
  const [userName, updateUserName] = useState("");

  useEffect(() => {
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
  });

  function submit(e) {
    // e.preventDefault();
    //Call Sign Out
    signOut().then((message) => {
      if (message === "") {
        history.push("/signin");
      }
    });
  }

  return (
    <div className="Homepage">
      <Navbar collapseOnSelect expand="lg" variant="dark" >
        <Navbar.Brand href="#Home.jsx">Journaline</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Nav.Link href="/yourJournal">{userName}</Nav.Link>
            <Nav.Link variant="info" onClick={submit}>Sign Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br></br>
      <br></br>
      <Form inline >
        <FormControl className="searchBar" type="text" placeholder="Search" />
        <Button className=" btn" variant="primary" size="lg">Search</Button>
      </Form>
      <br></br>
      <br></br>
      <CardColumns>
        <Card className="cl1">
          <Card.Body>
            <Card.Title>Person followed</Card.Title>
            <Card.Text>put some links inside get from DB</Card.Text>
            <Button className="testArea" variant="primary" href="/otherusertitlelist"
            >go to other user title list</Button>
          </Card.Body>
        </Card>

        <Card className="cl2">
          <Card.Body>
            <Card.Title>Newly published1</Card.Title>
            <Card.Text>put some newly published articles inside, get from DB</Card.Text>
          </Card.Body>
        </Card>

        <Card className="cl2">
          <Card.Body>
            <Card.Title>Newly published2</Card.Title>
            <Card.Text>put some newly published articles inside</Card.Text>
          </Card.Body>
        </Card>

        <Card className="cl2">
          <Card.Body>
            <Card.Title>Newly published3</Card.Title>
            <Card.Text>put some newly published articles inside</Card.Text>
          </Card.Body>
        </Card>

        <Card className="cl3">
          <Card.Body>
            <Card.Title>Newly published recommended journals</Card.Title>
            <Card.Text>put some newly published articles inside</Card.Text>
            <Button className="testArea" variant="primary" size="sm" href="/otheruserentry"
              type="submit">Go to other user entry</Button>
          </Card.Body>
        </Card>

      </CardColumns>
    </div>
  );
}