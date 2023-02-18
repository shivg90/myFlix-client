import { Card, Container, Row, Col, Button} from 'react-bootstrap';
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { ProfileView } from '../profile-view/profile-view';
import './movie-view.scss';

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  //const [favoriteMovies, setFavoriteMovies] = useState([]);
  const movie = movies.find((b) => b.id === movieId); 
  const token = localStorage.getItem("token");
  const storedUser = null;
  const storedstoredUser = localStorage.getItem("user");
  if (storedstoredUser) {
    try {
      storedUser = JSON.parse(storedstoredUser);
  } catch (e) {}
}

  // trying to add favorite button and function

    const addFavoriteMovie = () => {
    
      //e.preventDefault(); 

      fetch(`https://movieapi-9rx2.onrender.com/users/:id/favorites/${movie.id}`, {
          
          method: "POST",
          
          headers: {
          Authorization : `Bearer ${token}`,
          "Content-Type": "application/json" 
          },
          //body: JSON.stringify(data)

        }).then((response)=>response.json())
          .then((data)=> { 
          console.log(data);
          //setFavoriteMovies([...favoriteMovies, movie]);
          localStorage.setItem("user", JSON.stringify(data.user));
          alert('Movie added!')
          window.location.reload(); 
       
        }) .catch((error)=>{
        alert("Something went wrong!");
        console.log(error);
        })
    }; 
  
  /*const addFavoriteMovie = (movie) => {
    fetch(`https://movieapi-9rx2.onrender.com/users/:id/favorites/${movie.id}`, // need to define userId from API and movieId
            {
              method: "POST",
              headers: {
                // Authorization: `Bearer ${token}`, ?
                "Content-Type": "application/json"
              },
            }).then((response)=> response.json())
              .then((data)=> {
                console.log(data);
                //setFavoriteMovies([favoriteMovies, movie]);
              }) 
                .catch((e)=>console.log(e));
          }; */
    
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
                
                <Button onClick={addFavoriteMovie} className="fav-button" variant="secondary" type="submit" style={{ cursor: "pointer" }} > favorite</Button>
                
                </div>
                </Card.Text>
              </Card.Body> 
            </Card>
          </Col>
        </Row> 
      </Container> 
    );
  };
 