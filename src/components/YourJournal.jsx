import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import "../css/YourJournal.css";

export default function YourJournal() {

    const [publicJour, setPublicJour] = useState("");
    const [privateJour, setPrivateJour] = useState("");


    return (
        <div className="publicJournal">

            <Button className="btn" variant="primary" size="lg" href="/composeJournal" type="submit" >
                Compose Public Journal
             </Button>

            <Button className="btn" href="/composeJournal" size="lg" type="submit" >
                Compose Private Journal
             </Button>
        </div>

    );



}