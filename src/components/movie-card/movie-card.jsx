import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100" onClick={() => onMovieClick(movie)}>
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Button onClick={() => onMovieClick(movie)} variant="primary" className="open-button" style={{ cursor: "pointer" }} >
          Open
        </Button>
      </Card.Body>
    </Card>
  );
};


  // validation of data types between prop and component
  MovieCard.propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      genre: PropTypes.object,
      director: PropTypes.object,
      release: PropTypes.number
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };