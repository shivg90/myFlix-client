import React from 'react';
import {Button} from 'react-bootstrap';
import { Link } from "react-router-dom";


export const UserInfo = ({email, username, handleDeregister}) =>{
    return(
    <>
     <p> Name: {username}</p>   
     <p> Email: {email}</p>
        <Link to="/login">
        <Button variant = "danger" type ="submit" size="sm" onClick={()=>handleDeregister(username)}> Delete Account </Button> 
        </Link>
    </>
    );
};