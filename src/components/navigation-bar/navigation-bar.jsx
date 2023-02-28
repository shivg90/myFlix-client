import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

export const NavigationBar = ({ user, onLoggedOut, onSearch }) => {
  const handleSearch = (searchString) => {
    onSearch(searchString);
  };

  return (
      <Navbar expand="lg" className="navbar-custom" >
      <Container>
        <Navbar.Brand class="navbar-brand" as={Link} to="/"> MyFlix Movies </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          {!user && (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/users">Profile</Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                <Form className="d-flex">
                <Form.Control
                id="searchbar"
                type="search"
                placeholder="Search"
                className=""
                aria-label="Search"
                onChange={(event) => handleSearch(event.target.value)}
              />
            </Form>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      </Navbar>
    
  );
};

