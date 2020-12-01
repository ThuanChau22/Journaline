import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../css/Profile.css";
import Button from "react-bootstrap/Button";
import { Auth, API, graphqlOperation } from 'aws-amplify';
import {
  getFollow,
  pagesByUserName
} from "../graphql/queries"
import {
  createFollow,
  deleteFollow
} from "../graphql/mutations"

function GuessComponents(props) {
  return (
    <div className="profileBody">
      <h3>{props.userName}</h3>
      <FollowOptions userName={props.userName} />
      <label>Titles</label>
      <ListTitles userName={props.userName} status="public" />
      <br />
    </div>
  );
}

function FollowOptions(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFollow, setIsFollow] = useState(false);

  useEffect(() => {
    followStatus();
    // eslint-disable-next-line
  }, [isLoading]);

  async function followStatus() {
    const user = await Auth.currentAuthenticatedUser();
    const followId = user.username + "-" + props.userName;
    try {
      const result = await API.graphql(graphqlOperation(getFollow, { id: followId }));
      setIsFollow(result.data.getFollow !== null);
      setIsLoading(false);
    } catch (error) {
      console.log("error: ", error)
    }
    setIsLoading(false);
  }

  async function follow() {
    setIsLoading(true);
    const user = await Auth.currentAuthenticatedUser();
    const followId = user.username + "-" + props.userName;
    try {
      if (!isFollow) {
        await API.graphql(graphqlOperation(createFollow, { input: { id: followId, follower: user.username, followedUser: props.userName } }));
      } else {
        await API.graphql(graphqlOperation(deleteFollow, { input: { id: followId } }));
      }
    } catch (error) {
      console.log("error: ", error)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      {!isLoading &&
        <button className="followButton" onClick={follow}>{isFollow ? "Unfollow" : "Follow"}</button>
      }
    </div>
  );
}

function OwnerComponents(props) {
  return (
    <div className="profileBody">
      <Link className="composeLink" to={props.userName + "/compose"}>
        <Button variant="" size="lg" type="submit" block>
          Compose</Button>
      </Link>
      <label>Public</label>
      <ListTitles userName={props.userName} status="public" />
      <br />
      <label>Private</label>
      <ListTitles userName={props.userName} status="private" />
      <br />
    </div>
  );
}

function ListTitles(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [titles, setTitles] = useState(null);

  useEffect(() => {
    getTitles();
    // eslint-disable-next-line
  }, []);

  async function getTitles() {
    try {
      const result = await API.graphql(graphqlOperation(pagesByUserName, { username: props.userName, sortDirection: "DESC", statusCreatedAt: { beginsWith: { status: props.status } } }));
      setTitles(result.data.pagesByUserName.items)
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
              <Link to={"/" + props.userName + "/" + page.id} >{page.title}</Link>
            </div>
          );
        })
      }
    </div>
  );
}

function Profile() {
  let { userName } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    authorizedUser();
    // eslint-disable-next-line
  }, []);

  async function authorizedUser() {
    const user = await Auth.currentAuthenticatedUser();
    if (user.username === userName) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
    setIsLoading(false);
  }

  return (
    <div>
      {!isLoading &&
        (!isOwner
          ? <GuessComponents userName={userName} />
          : <OwnerComponents userName={userName} />
        )
      }
    </div>
  );
}


export default Profile;