import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Card from 'react-bootstrap/Card'
import "../css/YourTitleList.css";

export default function YourTitleList() {

    return(

        <div className="yourtilelist">
            <Button variant="info" href="/composeJournal">Compose</Button>

            <Card className ="list-body">
                <Card.Body>
                <Card.Title>Personal diary column</Card.Title>
                <Card.Text>get some personal diary links inside get from DB</Card.Text>
                </Card.Body>
                </Card>
 
        </div>

    );


}