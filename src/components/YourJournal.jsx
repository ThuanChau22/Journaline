import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../css/YourJournal.css";

export default function YourJournal(){

    const [publicJour, setPublicJour] = useState("");
    const [privateJour, setPrivateJour] = useState("");


    return(
        <div className = "publicJournal">
             <Button href="/composeJournal" block size="lg" type="submit" >
              Public
             </Button>

             <Button href="/composeJournal" block size="lg" type="submit" >
              Private
             </Button>
        </div>

    );
    


}