import { useState, useEffect } from "react";
import { FavMovies } from "../profile-view/fav-movies";
import { UserInfo } from "./user-info";
import { Card, Container, Col, Row, Button, Form } from "react-bootstrap";


export const ProfileView = ({ user, movies }) => {
    const [updatedUser, setUpdatedUser] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [token] = useState("");

   // const [favoriteMovies, setFavoriteMovies] = useState([]);

// const storedToken = localStorage.getItem("token");
//  const storedUser = localStorage.getItem("user");
//  const [token] = useState(storedToken ? storedToken : null); 

    // apply filter to favorite movie list
    const favMovies = movies.filter((movie) => user.FavoriteMovies.includes(movie._id));

    // remove movie from fav
    const removeFav = (id) => {
      fetch(`https://movieapi-9rx2.onrender.com/users/${user._id}/favorites/${id}`,
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

    // updates user info
    const handleUpdate = (e) => {
    
        e.preventDefault(); 
        
        const data = {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday
        };

        fetch(`https://movieapi-9rx2.onrender.com/users/${user.username}`, {
            method: "PUT",
            headers: {
            Authorization : `Bearer ${token}`,
            "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
    
        }).then((response)=>response.json())
        .then((data)=> { console.log(data);
          if(data.ok){
            alert('Update successful!');
            setUpdatedUser(true);
            window.location.reload();
            localStorage.setItem("user", JSON.stringify(data.user));
     
          }else{
              alert('Update failed!')
          }
      }).catch((e)=>{
          alert("Something went wrong!");
          console.log(e);
      })
  }

  // then useEffect for when/if user decides to update their info

    useEffect(() => {
      if(updatedUser){
        fetch(`https://movieapi-9rx2.onrender.com/users/${user.username}`,{
              method: "GET",
              headers:{
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
              },
        })
        .then((response) => response.json())
        .then((data) => {
            if(data){
              setUsername(data.username);
              setPassword(data.Password);
              setEmail(data.Email);
              setBirthday(data.Birthday);
              setUpdatedUser(false);
            }
        })
        .catch((e) => {
          alert('Something went wrong!');
          console.log(e);
        });
      }
  },[updatedUser])

    // deletes user account
    const handleDeregister = () => { //remove username from parenthesis
    
        fetch(`https://movieapi-9rx2.onrender.com/users/${user.username}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        }).then((response) => response.json())
          .then((data) => {
            if (data.ok){
            alert("Account successfully deleted");
            <Navigate to="/signup" /> // replace window reload with navigate

          } else {
            alert("Deletion failed!");
            window.location.reload();
          }
        }).catch((e)=>{
          alert("Something went wrong")
          window.location.reload();
          console.log(e);

      })
    };

// returns 1. rendered userinfo component, 2. update form, 3. rendered favorites from fav-movies component
  return (
    <Container >
      <Row>
        <Col xs={12} sm={4}>
          <Card style={{marginTop: 30}}>
            <Card.Body>
              <Card.Title>My Information</Card.Title>
              <Card.Text>
              <UserInfo username={user.Username} email={user.Email} handleDeregister={handleDeregister} /> 
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={8}>
          <Card style={{marginTop: 30}}>
          <Card.Body>
              <Card.Title>Update Information</Card.Title>
              <Form className="w-100" onSubmit={handleUpdate}> 
              <Form.Group controlId="updateFormUsername">
                <Form.Label>New Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={event => setUsername(event.target.value)} // onChange={event => handleUpdates(event)} ^ Form line: onSubmit={(event) => handleSubmit(event)}  
                  minLength="5" 
                  placeholder="Enter username (min 5 characters)"

                />
              </Form.Group>

              <Form.Group controlId="updatePassword">
                <Form.Label>New Password:</Form.Label>
                <Form.Control
                  type="password"
                  value=''
                  onChange={event => setPassword(event.target.value)}
                  placeholder="Password"

                />
              </Form.Group>

              <Form.Group controlId="updateFormEmail">
                <Form.Label>New Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group controlId="updateFormBirthday">
                <Form.Label>New Birthday:</Form.Label>
                <Form.Control
                  type="date"
                  value={birthday}
                  onChange={event => setBirthday(event.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit" style={{ margin: '0.7rem'}} onClick={handleUpdate}>
                Save Changes
              </Button>
              </Form>

            </Card.Body>
          </Card>
        </Col>

      </Row>
      <>
        <Row>
            <Col xs={12}>
              <h4>Favorite Movies</h4>
            </Col>
            <FavMovies 
              favMovies={favMovies}
              removeFav={removeFav}
            />
        </Row>
                
      </>
  </Container>
  );
};




 

