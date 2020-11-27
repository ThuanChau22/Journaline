import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import "../css/Homepage.css";
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'

export default function Homepage() {

    return(
        <div className = "Homepage">
            <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="primary">Search</Button>
            <Button className="btnUser" variant="info" href="/yourJournal">User</Button>
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