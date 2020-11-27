import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Card from 'react-bootstrap/Card'
import "..css/YourTitleList.css";


export default function OtherUserTitleList() {

    return(

        <div className="otherusertitlelist">
            

            <Card className ="list-body">
                <Card.Body>
                <Card.Title>Personal diary column</Card.Title>
                <Card.Text>get some personal diary links inside get from DB</Card.Text>
                <Button className="testArea" variant="primary" href="/otheruserentry" 
                        type="submit">Go to other user entry</Button>
                </Card.Body>
                </Card>
 
        </div>

    );


}