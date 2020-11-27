import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import "../css/Homepage.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'

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
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="primary">Search</Button>
        {/* username as actual username */}
        <Button className="btnUser" variant="info" href="/yourJournal">{userName}</Button>
        {/* tempo sign out button to test sign out */}
        <Button className="btnUser" variant="info" onClick={submit}>Sign Out</Button>
      </Form>
      <br></br>
      <br></br>
      <CardColumns>
        <Card>
          <Card.Body>
            <Card.Title>Person followed</Card.Title>
            <Card.Text>put some links inside get from DB</Card.Text>
            <Button className="testArea" variant="primary" href="/otherusertitlelist"
              type="submit">Go to other user title list</Button>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Card.Title>Newly published1</Card.Title>
            <Card.Text>put some newly published articles inside, get from DB</Card.Text>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Card.Title>Newly published2</Card.Title>
            <Card.Text>put some newly published articles inside</Card.Text>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Card.Title>Newly published3</Card.Title>
            <Card.Text>put some newly published articles inside</Card.Text>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Card.Title>Newly published recommended journals</Card.Title>
            <Card.Text>put some newly published articles inside</Card.Text>
            <Button className="textArea" variant="primary" href="/otheruserentry"
              type="submit">Go to other user entry</Button>
          </Card.Body>
        </Card>

      </CardColumns>
    </div>
  );
}