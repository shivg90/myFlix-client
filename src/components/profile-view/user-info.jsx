import React from 'react';
import {Button} from 'react-bootstrap';
import { Link } from "react-router-dom";

export const UserInfo = ({email, username, birthday, handleDeregister}) =>{
    return(
    <>
    <h4>My Information</h4>
    <br />
    <p>name: {username}</p>
    <p>e-mail: {email}</p>
    <p>birthday: {new Date(birthday).toISOString().slice(0,10).replace(/-/g,"/")} </p>
        <Link to="/signup" className="d-flex justify-content-end">
        <Button variant="link" style={{color: "red"}} onClick={handleDeregister}> Delete account </Button> 
        </Link>
    </>
    );
};