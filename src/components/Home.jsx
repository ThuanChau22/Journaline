import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "../css/Home.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import { Auth, API, graphqlOperation } from 'aws-amplify';
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
  return (
    <div className="homebody">
      <Form className="searchForm">
        <FormControl className="searchBar" type="text" placeholder="Search..." />
        {/* <Button className=" seachButton" variant="primary" size="lg">Search</Button> */}
      </Form>
      <hr />
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

export default Home;