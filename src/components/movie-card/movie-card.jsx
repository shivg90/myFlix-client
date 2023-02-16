import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import './movie-card.scss';


export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-100" style={{marginTop: 20}}>
      <Card.Img className="card-image" variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text className="card-text">{movie.description}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link" className="open-button" style={{ cursor: "pointer" }}>See more</Button>
        </Link>
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
    }).isRequired
  };