import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Auth, API, graphqlOperation } from 'aws-amplify';
        
import "../css/Homepage.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'

import {
  checkUser,
  signOut
} from "../js/authentication";
import {
  getUser,
  pagesByStatus
} from "../graphql/queries"

function ListFollowedUsers(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [followedUsers, setFollowedUsers] = useState(null);
  useEffect(() => {
    getFollowedUsers();
    // eslint-disable-next-line
  }, [props]);

  async function getFollowedUsers() {
    try {
      const list = await API.graphql(graphqlOperation(getUser, { username: props.userName }));
      setFollowedUsers(list.data.getUser.follow.items);
      setIsLoading(false);
    } catch (error) {
      console.log("error: ", error)
    }
  }
  return (
    <div>
      {!isLoading &&
        followedUsers.map((e) => {
          return (
            <div key={e.user.id} id={e.user.username}>
              <Link to={e.user.username} >{e.user.username}</Link>
            </div>
          );
        })}
    </div>
  );
}

function ListRecentTitles() {
  const [isLoading, setIsLoading] = useState(true);
  const [titles, setTitles] = useState(null);

  useEffect(() => {
    fetchRecentTitles();
  }, []);

  async function fetchRecentTitles() {
    try {
      const result = await API.graphql(graphqlOperation(pagesByStatus, { status: "public", sortDirection: "DESC" }));
      setTitles(result.data.pagesByStatus.items);
      setIsLoading(false);
    } catch (error) {
      console.log("error: ", error)
    }
  }

  return (
    <div>
      {!isLoading &&
        titles.map((page) => {
          return (
            <div key={page.id} id={page.id}>
              <Link to={page.username + "/" + page.id}>{page.title}</Link>
            </div>
          );
        })}
    </div>
  );
}

function Home() {      
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [username, updateUserName] = useState("");

  useEffect(() => {
    fetchUser();
  });

  async function fetchUser() {
    //Check user sign in status
    const message = await checkUser();
    if (message === "") {
      //Get username
      const user = await Auth.currentAuthenticatedUser();
      updateUserName(user.username);
      setIsLoading(false);
    } else {
      history.push("/signin");
    }
  }

  async function submit(e) {
    e.preventDefault();
    //Call Sign Out
    const message = await signOut();
    if (message === "") {
      history.push("/signin");
    }
  }

  return (
    
<!--     <div>
      {!isLoading &&
        <div>
          <h3>Welcome,
            <Link to={username} >{username}</Link>
          </h3>
          <form method="post" onSubmit={submit}>
            <input type="submit" name="userName" value="Sign Out" />
          </form>
          <br />
          <label>Followed users: </label>
          <ListFollowedUsers userName={username} />
          <br />
          <label>Most Recent Titles: </label>
          <ListRecentTitles />
        </div>
      } -->
    
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
        
export default Home;