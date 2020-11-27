import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import config from "../config";
import "..css/ComposeJournal.css";

export default function ComposeJournal() {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    function validateForm() {
        return content.length > 0 && title.length >0;
      }

      async function handleSubmit(event) {
        event.preventDefault();

      }

      return(
        <div className="ComposeJournal">
        <Form onSubmit={handleSubmit}>

            <Form.Group controlId="title">
                <Form.Control
                    value={title}
                    as="textarea"
                    onChange={(e) => setTitle(e.target.value)}
                    />
            </Form.Group>
          <Form.Group controlId="content">
          <Form.Control
            value={content}
            as="textarea"
            onChange={(e) => setContent(e.target.value)}
          />
          </Form.Group>

          <Button block size="lg" type="submit" disabled={!validateForm()}>
          Publish
        </Button>
          </Form>
          </div>
      );

}
