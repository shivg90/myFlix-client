import { useState } from "react";
import { Card, CardGroup, Col, Container, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // validation of user login
  const handleSubmit = (event) => {
    // prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      Username: username,
      Password: password
    };

    fetch(`https://movieapi-9rx2.onrender.com/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Login response: ", data);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        onLoggedIn(data.user, data.token);
      } else {
        alert("No such user");
      }
    })
    .catch((e) => {
      alert("Something went wrong");
    });
  };

  // login form with submit button
  return (
    // new code: Bootstrap
    // handleSubmit is the callback of onSubmit, tells the login API to validate user and password
    <Container >
      <Row>
        <Col className="d-flex justify-content-center">
        <h1 style={{marginTop: 120}}>Welcome to MyFlix!</h1>
        </Col>
      </Row>

      <Row>
        <Col>
          <CardGroup>
            <Card style={{marginTop: 80, backgroundColor: "whitesmoke"}}>
            <Card.Body>
              <Card.Title>Login</Card.Title>
              <Form onSubmit={handleSubmit} >
                <Form.Group controlId="logInFormUsername">
                <Form.Label style={{ marginTop: 10 }}>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength="5" 
                  placeholder="username"
                />
                </Form.Group>

                <Form.Group controlId="logInFormPassword">
                <Form.Label style={{ marginTop: 15 }}>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="password"
                />
              </Form.Group>

              <Button variant="primary" type="submit" style={{ margin: '0.7rem'}}>
              Submit
              </Button>
              </Form>
              <Link to="/signup" className=" d-flex justify-content-end">
              <Button variant="link" style={{color: "black"}}> Create account </Button> 
              </Link>
            </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
    );
  };
    
    
