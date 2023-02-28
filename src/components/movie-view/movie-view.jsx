//import { response } from 'express';
//import { useState } from "react";

import { Card, Container, Row, Col, Button} from 'react-bootstrap';
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import './movie-view.scss';

export const MovieView = ({ user, movies}) => {
  const { movieId } = useParams();
  const movie = movies.find((b) => b.id === movieId); 
  const token = localStorage.getItem("token");
  
  //code workaround for storedUser error
  const storedUser = null;
  const storedstoredUser = localStorage.getItem("user");
  if (storedstoredUser) {
    try {
      storedUser = JSON.parse(storedstoredUser);
  } catch (e) {}
  }   
  console.log ("this is the user passed from the profile view", user);
  console.log ("stored username", storedstoredUser.Username);

// movie view render
    return (
      <Container > 
        <Row> 
          <Col md={12}> 
            <Card style={{marginTop: 30, backgroundColor: "whitesmoke"}}>
              <Card.Img variant="top" src={movie.image} className="w-100" />
              <Card.Body >
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                <div>
                <div>
                  <span>Description: </span>
                  <span>{movie.description}</span>
                </div>
                <div>
                  <span>Genre: </span>
                  <span>{movie.genre}</span>
                </div>
                <div>
                  <span>Director: </span>
                  <span>{movie.director}</span>
                </div>
                <div>
                  <span>Release: </span>
                  <span>{movie.release}</span>
                </div>
                <Link to={`/`}>
                  <Button className="back-button" style={{ cursor: "pointer" }}>Back</Button>
                </Link>
                
                </div>
                </Card.Text>
              </Card.Body> 
            </Card>
          </Col>
        </Row> 
      </Container> 
    );
  };
 