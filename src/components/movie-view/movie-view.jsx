import { Card, Container, Row, Col, Button} from 'react-bootstrap';
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import './movie-view.scss';

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((b) => b.id === movieId); 

  // trying to add click event to favorite button
  const handleAddFavorite = (event) => {

  const data = {
    FavoriteMovie: movieId,
  };

  fetch("https://movieapi-9rx2.onrender.com/users/${userId}/favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then((response) => response.json())
  .then((data) => {
    console.log("movie added to favorites");
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      onLoggedIn(data.user, data.token);
    } else {
      alert("movie could not be added");
    }
  })
  .catch((e) => {
    alert("Something went wrong");
  });
};
 
// movie view render
    return (
      <Container > 
        <Row> 
          <Col md={12}> 
            <Card >
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
                  <button className="back-button" style={{ cursor: "pointer" }}>Back</button>
                </Link>
                
                <Button onClick={() => handleAddFavorite()} className="fav-button" variant="secondary" size="sm" type="submit" style={{ cursor: "pointer" }} >Favorite</Button>
                
                </div>
                </Card.Text>
              </Card.Body> 
            </Card>
          </Col>
        </Row> 
      </Container> 
    );
  };
 