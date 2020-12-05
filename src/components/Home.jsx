import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "../css/Home.css";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import { Auth, API, graphqlOperation } from 'aws-amplify';
import {
  getUser,
  pagesByStatus
} from "../graphql/queries"
import {
  checkUser
} from "../js/authentication";


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
        followedUsers.map((item) => {
          return (
            <div key={item.id} id={item.followedUser}>
              <Link to={item.followedUser} >{item.followedUser}</Link>
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
              <Link to={"/" + page.username + "/" + page.id}>{page.title}</Link>
            </div>
          );
        })}
    </div>
  );
}

function Home() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    console.log("here");
    //Check user sign in status
    checkUser().then((message) => {
      if (message !== "") {
        history.push("/signin");
      }
    });
    getUserName();
    // eslint-disable-next-line
  }, []);

  async function getUserName() {
    const user = await Auth.currentAuthenticatedUser();
    setUserName(user.username);
    setIsLoading(false);
  }

  return (
    <div>
      {!isLoading &&
        <div className="home-body">
          <Form className="searchForm">
            <FormControl className="searchBar" type="text" placeholder="Search..." />
            <Button className=" seachButton" variant="primary" size="sm">Search</Button>
          </Form>
          <hr /><hr />
          <CardColumns>
            <Card className="cl1">
              <Card.Body>
                <Card.Title>Followed Users</Card.Title>
                <ListFollowedUsers userName={userName} />
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
                <Card.Title>Newly published journals</Card.Title>
                <ListRecentTitles />
              </Card.Body>
            </Card>
          </CardColumns>
        </div>
      }
    </div>
  );
}

export default Home;