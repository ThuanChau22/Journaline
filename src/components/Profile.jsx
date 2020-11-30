import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../css/Profile.css";
import Button from "react-bootstrap/Button";
import { Auth, API, graphqlOperation } from 'aws-amplify';
import {
  pagesByUserName
} from "../graphql/queries"

function GuessComponents() {

}

function OwnerComponents(props) {
  return (
    <div className="profileBody">
      <Button variant="primary" size="lg" type="submit" block>
        <Link className="composeLink" to={props.userName + "/compose"}>Compose</Link>
      </Button>
      <ListTitles userName={props.userName} status="public" />
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
          ? <GuessComponents />
          : <OwnerComponents userName={userName} />
        )
      }
    </div>
  );
}


export default Profile;