import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Card from 'react-bootstrap/Card'
import "../css/OtherUserEntry.css";

export default function OtherUserEntry() {

        return(

            <div className="OtherUserEntry">
                 <Button className="btnFollow" variant="primary" href="/yourJournal">Follow</Button>
                 <Button className="btnUnfollow" variant="primary" href="/yourJournal">Unfollow</Button>
                <br></br>

                <Card className ="list-body">
                <Card.Body>
                <Card.Title>other users' diary column</Card.Title>
                <Card.Text>get some personal diary links inside get from DB, need to edit the text bos to be linked type</Card.Text>
                </Card.Body>
                </Card>

            
            </div>

        );

}