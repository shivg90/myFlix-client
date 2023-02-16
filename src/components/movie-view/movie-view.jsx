import { Card, Container, Row, Col, Button} from 'react-bootstrap';
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import './movie-view.scss';

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const [favoriteMovies, setFavoriteMovies] = useState(user.FavoriteMovies);

  const movie = movies.find((b) => b.id === movieId); 

  // trying to add favorite button and function
  // refactor code to make an event click?
  const addFav = (movie) => {
    fetch(`https://movieapi-9rx2.onrender.com/users/${user.id}/favorites/${movie._id}`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`, 
                "Content-Type": "application/json"
              },
         
            }).then((response)=> response.json())
              .then((data)=> {
                if (data.ok) {
                console.log(data);
                setFavoriteMovies([favoriteMovies]); // ?
              } else {
                  alert('there was an issue adding the movie.')
              }
              }) .catch((e)=>console.log(e));
          };
 
// movie view render
    return (
      <Container > 
        <Row> 
          <Col md={12}> 
            <Card style={{marginTop: 30}}>
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
                  <Button className="back-button" style={{ cursor: "pointer" }}>Back</Button>
                </Link>
                
                <Button onClick= {()=>addFav(movie._id)} className="fav-button" variant="secondary" type="submit" style={{ cursor: "pointer" }} >Favorite</Button>
                
                </div>
                </Card.Text>
              </Card.Body> 
            </Card>
          </Col>
        </Row> 
      </Container> 
    );
  };
 