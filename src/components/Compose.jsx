import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "../css/Compose.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Auth, API, graphqlOperation } from 'aws-amplify';
import {
  createPage
} from "../graphql/mutations"


function Compose() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function validateForm() {
    return content.length > 0 && title.length > 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const target = e.target;
    const user = await Auth.currentAuthenticatedUser();
    try {
      await API.graphql(graphqlOperation(createPage, {
        input: {
          username: user.username,
          status: target.status.value,
          title: target.title.value,
          content: target.content.value
        }
      }));
      history.push("/" + user.username);
    } catch (error) {
      console.log("error: ", error)
    }
  }

  return (
    <div className="compose-body">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Control
            name="title"
            value={title}
            as="input"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
          />
        </Form.Group>
        <Form.Group controlId="content">
          <Form.Control
            name="content"
            value={content}
            as="textarea"
            onChange={(e) => setContent(e.target.value)}
            placeholder="content"
          />
        </Form.Group>
        <Form.Control
          name="status"
          as="select"
          className="mr-sm-2"
          id="inlineFormCustomSelect"
          custom>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </Form.Control>
        <hr />
        <Button size="lg" type="submit" disabled={!validateForm()}>
          Publish
        </Button>
      </Form>
    </div>
  );
}


export default Compose;