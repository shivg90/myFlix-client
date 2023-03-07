import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { UserInfo } from "./user-info";
import { useParams } from "react-router";
import { Card, Container, Col, Row, Button, Form } from "react-bootstrap";
import './profile-view.scss';
import moment from "moment";



export const ProfileView = ({ movies }) => {

    const storedUser = JSON.parse(localStorage.getItem("user"))
    //const [updatedUser, setUpdatedUser] = useState(false);
    const { movieId } = useParams();
    const [username, setUsername] = useState(storedUser.Username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(storedUser.Email);
    const [birthday, setBirthday] = useState(storedUser.Birthday);
    const token = localStorage.getItem("token");
    const [showForm, setShowForm] = useState(false);
    //const storedUser = null;
    
    console.log ("user profile view", storedUser);
 
  

    // apply filter to favorite movie list
    const favMovies = movies.filter((movie) => storedUser.FavoriteMovies.includes(movie.id));
    console.log ("movies profile view", favMovies);

    // handle for updating user info
    const handleUpdate = (e) => {
    
      e.preventDefault(); 
      
      const data = {};
      if (username !== storedUser.Username) data.Username = username;
      if (password) data.Password = password;
      if (email !== storedUser.Email) data.Email = email;
      if (birthday !== storedUser.Birthday) data.Birthday = birthday;
      
      console.log(data);

      fetch(`https://movieapi-9rx2.onrender.com/users/${storedUser.Username}`, {
          
          method: "PATCH",
          
          headers: {
          Authorization : `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json"
          },
          body: JSON.stringify(data)

        }).then((response)=>response.json())
          .then((data)=> { 
          console.log(data);
          //const updatedField = Object.keys(data)[0];
          //alert(`Updated ${updatedField} successfully! Please log in again!`);
          //storedUser[updatedField] = data[updatedField];
          localStorage.setItem("user", JSON.stringify(data.user));
          alert("Update successful, please log in again!");
          localStorage.clear();
          window.location.reload();
          
        }).catch((e)=>{
        alert("Something went wrong!");
        console.log(e);
        })
    }; 
    
    const handleToggleForm = () => {
      setShowForm(!showForm);
    };
  
    // handle for deleting user account
    const handleDeregister = () => { 
    
        fetch(`https://movieapi-9rx2.onrender.com/users/${storedUser.Username}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        }).then((response) => {
           if (response.ok) {
            localStorage.clear();
            alert("Account successfully deleted");
            <Navigate to="/signup" /> // replace window reload with navigate
           }
            else {
            alert("Deletion failed!")
            window.location.reload();
          }
        }).catch((e)=>{
          alert("Something went wrong")
          window.location.reload();
          console.log(e);

      })
    };

// returns 1. rendered userinfo component, 2. update form, 3. rendered favorites list
  return (
    <Container>
      <Row className="mb-4" style={{marginTop: 60}}>
        <Col xs={12} sm={8} md={6} lg={6}>
          <Card style={{marginTop: 30, backgroundColor: "whitesmoke"}}>
            <Card.Body>
              <UserInfo username={storedUser.Username} email={storedUser.Email} birthday={storedUser.Birthday} handleDeregister={handleDeregister} /> 
              
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Button variant="secondary" size="sm" onClick={handleToggleForm}>{showForm ? "close" : "edit info"} </Button>
        </Col>
      </Row>

      <Row>
        <Col>
        {showForm && (

          <Card style={{marginTop: 30, backgroundColor: "whitesmoke", marginBottom: 30}}>
          <Card.Body>
            <Card.Title>Update Information</Card.Title>
              <Form className="w-100" onSubmit={handleUpdate}> 
              <Form.Group controlId="updateFormUsername">
                <Form.Label style={{ marginTop: 10 }}>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={event => setUsername(event.target.value)} 
                  minLength="5" 
                  placeholder="Enter username (min 5 characters)"

                />
              </Form.Group>

              <Form.Group controlId="updatePassword">
                <Form.Label style={{ marginTop: 15 }} >Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  placeholder="Password"

                />
              </Form.Group>

              <Form.Group controlId="updateFormEmail">
                <Form.Label style={{ marginTop: 15 }} >Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group controlId="updateFormBirthday">
                <Form.Label style={{ marginTop: 15 }} >Birthday: </Form.Label>
                <Form.Control
                  type="date"
                  value={moment(birthday).format("MM-DD-YYYY")}
                  onChange={event => setBirthday(event.target.value)}
                />
              </Form.Group>

              <Button variant="secondary" type="submit" style={{marginTop: 20}} onClick={handleUpdate}>
                Save Changes
              </Button>
              </Form>
          
            </Card.Body>
          </Card>
          )}


        </Col>
      </Row>


        
      
      <>
      <Row style={{marginTop: 100}}>
        {favMovies.length === 0 ? ( 
        <h4>You haven't added any movies! </h4>
        ) : (
        <>  
        <h4>Favorite Movies</h4>
        {favMovies.map((movie)=>( 
          <Col xs={12} md={6} lg={4} key={movie.id} className="mb-4" >
            <MovieCard 
              movie = {movie}
            />
          </Col>
        ))}              
        </>
      )}  
      </Row>
      </>
  </Container>
  );
};