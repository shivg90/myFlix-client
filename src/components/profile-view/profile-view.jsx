import { useState } from "react";
import { Card, Container, Col, Row, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FavoritesView } from "../profile-view/fav-movies";

export const ProfileView = ({ user, movies }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [token] = useState("");

    const favMovies = movies.filter((movie) => user.FavoriteMovies.includes(movie._id))
        
    const removeFav = (id) => {
        fetch("https://movieapi-9rx2.onrender.com/users/${user._id}/favorites",
            {
              method: "DELETE",
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`, 
                  "Content-Type": "application/json",
              },
            }  
        ).then((response)=> response.json())
        .then((data)=>{
            if(data.newUser){
                localStorage.setItem('user', JSON.stringify(data.newUser));
                window.location.reload();
            }else{
                alert('there was an issue removing the movie.')
            }
        }).catch((e)=>console.log(e));
    }

    const handleUpdates = (event) => {
    
        event.preventDefault(); 
        
        const data = {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday
        };

        fetch("https://movieapi-9rx2.onrender.com/users/${user.Username}", {
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
              <Card.Title>MyFlix Profile</Card.Title>
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
              <Form onSubmit={handleUpdates} className="w-100">  
              <Form.Group controlId="updateFormUsername">
                <Form.Label>New Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)} 
                  minLength="5" 
                  placeholder="Enter username (min 5 characters)"

                />
              </Form.Group>

              <Form.Group controlId="updatePassword">
                <Form.Label>New Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Password"

                />
              </Form.Group>

              <Form.Group controlId="updateFormEmail">
                <Form.Label>New Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group controlId="updateFormBirthday">
                <Form.Label>New Birthday:</Form.Label>
                <Form.Control
                  type="date"
                  value={birthday}
                  onChange={(event) => setBirthday(event.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit" style={{ margin: '0.7rem'}}>
                Save Changes
              </Button>
              </Form>

            </Card.Body>
          </Card>
          <Link to="/login">
          <Button onClick={() => handleDeregister(user._id)} className="button-delete mt-3" type="submit" variant="danger" >Delete Account</Button>
          </Link>
        </Col>

      </Row>
      <FavoritesView favMovies={favMovies} removeFav={removeFav}/>
  </Container>
  );
};




 

