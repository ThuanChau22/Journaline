import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Auth, API, graphqlOperation } from 'aws-amplify';
import {
  getFollow,
  pagesByUserName
} from "../graphql/queries"
import {
  createFollow,
  deleteFollow
} from "../graphql/mutations"

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
        <button onClick={follow}>{isFollow ? "Unfollow" : "Follow"}</button>
      }
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
              <Link to={props.userName + "/" + page.id} >{page.title + " - " + page.createdAt}</Link>
            </div>
          );
        })
      }
    </div>
  );
}


// function Compose(props) {
//   return (

//   );
// }


function User() {
  let { userName } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    authorizeUser();
    // eslint-disable-next-line
  }, []);

  async function authorizeUser() {
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
      <h3>{userName}</h3>
      {!isLoading &&
        (!isOwner
          ?
          <div>
            <FollowOptions userName={userName}></FollowOptions>
            <label>Titles: </label>
            <ListTitles userName={userName} status="public" />
          </div>
          :
          <div>
            <label>Public</label>
            <ListTitles userName={userName} status="public" />
            <br />
            <label>Private</label>
            <ListTitles userName={userName} status="private" />
          </div>
        )
      }
    </div>
  );
}

export default User;