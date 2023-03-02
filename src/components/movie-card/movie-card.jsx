import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card, ButtonGroup, Col} from "react-bootstrap";
import { Link } from "react-router-dom";
//import { FaHeart } from "react-icons/fa";
import './movie-card.scss';


export const MovieCard = ({ movie }) => {
  
  
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  console.log("user", user);

  // .find method checks if there is a movie in the users Favorite Movies array by id
  const alreadyFavorite = user.FavoriteMovies.find(id => id === movie.id);
  
  // useState checks the returned value of alreadyFavorite, if a value is returned "true", if not "false"
  //console.log ("Favorite ?", alreadyFavorite);
  const [favorite, setFavorite] = useState(alreadyFavorite? true : false);
  
  //console.log(favorite);
  const toggleFavorite = () => {
    // if token is undefined/empty, the return statement stops the execution of the function
    if (!token) return;

    const url = `https://movieapi-9rx2.onrender.com/users/${user.Username}/movies/${movie.id}`;

    let requestOptions = {
      method: '',
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  
    // combine add and remove fav under same request options header with if else statement
    // use different .methods for adding or removing
    // use the different states of setFavorite (false to remove movie, true to add movie)
    if (alreadyFavorite) {
      requestOptions.method = 'DELETE';
      alert("Movie deleted from favorites!");
      setFavorite (false);
    } else {
      requestOptions.method = 'POST';
      alert("Movie added to favorites!");
      setFavorite (true);
    }

    // return data
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        //setFavorite = (!alreadyFavorite);
        console.log ("data", data);
        console.log("user post favorite clic", user);
        localStorage.setItem('user', JSON.stringify(data)); // sets new movie data to the user's local storage
        //window.location.reload(false);
      })
      .catch((e) => {
        alert('Something went wrong');
      });

  };

  console.log("user post favorite click 2", user);

  return (
    <Card className="h-100" style={{marginTop: 20, backgroundColor: "whitesmoke"}}>
      <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
      <Card.Img className="card-image" variant="top" src={movie.image} />
      <Card.Body >
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text className="card-text">{movie.description}</Card.Text>
        <ButtonGroup className="d-flex justify-content-center align-items-center" style={{marginLeft: 50, marginRight: 40}}>
          {favorite ? (
          <Button variant="danger" size="sm" className="fav-button" onClick={() => toggleFavorite()}> Remove favorite</Button>) : (
          <Button variant="success" size="sm" className="fav-button" onClick={() => toggleFavorite()}> Add favorite</Button>)
          }
        </ButtonGroup>
      </Card.Body>
      </Link>
    </Card>
  );
};

  // validation of data types between prop and component
  MovieCard.propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      genre: PropTypes.string,
      director: PropTypes.string,
      release: PropTypes.string
    }).isRequired
  };
