import { useState } from "react";
import { Card, Container, Col, Row, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, movies }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [token] = useState("");

    const favoriteMovies = movies.filter((movie) => user.FavoriteMovies.includes(movie.id));

    const handleSubmit = (event) => {
    
        event.preventDefault(); 
        
        const data = {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday
        };

        fetch("https://movieapi-9rx2.onrender.com/users", {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
            "Content-Type": "application/json"
            }
    
        }).then((response) => {
          if (response.ok) {
            alert("Update successful");
            window.location.reload();

        } else {
          alert("Update failed");
        }
      });
    }; 

    const handleDeregister = () => {
    
        fetch("https://movieapi-9rx2.onrender.com/users/${user.Username}", {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }).then((response) => {
          if (response.ok) {
            alert("Account successfully deleted");
            localStorage.clear();
            window.location.reload(); 
          } else {
            alert("Something went wrong");
          }
        });
      };

  return (
    <Container >
      <Row>
        <Col>
          <Card style={{marginTop: 30}}>
            <Card.Body>
              <Card.Title>Your MyFlix Profile</Card.Title>
              <Card.Text>
                <div>
                <div>
                  <span>Username: {user.Username}</span>
                </div>
                <div>
                  <span>Birthday: {user.Birthday} </span>
                </div>
                <div>
                  <span>Email: {user.Email} </span>
                </div>
                </div>
                </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card style={{marginTop: 30}}>
          <Card.Body>
              <Card.Title>Update your Information</Card.Title>
              <Form onSubmit={handleSubmit}>  
              <Form.Group controlId="updateFormUsername">
                <Form.Label>New Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  minLength="5" 
                  placeholder="Enter username (min 5 characters)"

                />
              </Form.Group>

              <Form.Group controlId="updatePassword">
                <Form.Label>New Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"

                />
              </Form.Group>

              <Form.Group controlId="updateFormEmail">
                <Form.Label>New Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group controlId="updateFormBirthday">
                <Form.Label>New Birthday:</Form.Label>
                <Form.Control
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit" style={{ margin: '0.7rem'}}>
                Save Changes
              </Button>
              </Form>

            </Card.Body>
          </Card>
          <Button onClick={() => handleDeregister(user._id)} className="button-delete mt-3" type="submit" variant="danger" >Delete Account</Button>
        </Col>

      </Row>

      <Row className="justify-contents-center">
        <h3>Favorite movies:</h3>
            {favoriteMovies.length === 0 ? (
              <span>There are no movies in your favorites. </span> 
              ) : (
              <>
              {favoriteMovies.map ((movie) => (
              <Col xs={12} md={6} lg={4} xl={3} key={movie.id} className="fav-movie">
                <MovieCard movie={movie} />
              </Col>
            
            ))}
              </>
           )}            
      </Row>    
  </Container>
  );
};

/* <Button onClick = {()=>removeFav(movie.id)}> Remove </Button> */


 

