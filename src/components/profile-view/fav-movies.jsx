import React from "react";
import { Button, Col, Row, Card } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import './profile-view.scss'

export const FavMovies = ({ favMovies, removeFavoriteMovie }) => { 
  
   /*  const handleToggle = (movie) => {
      toggleFavorite(movie);
    }; */

return (
  <Card>
    <Card.Body>
      <Row>
        {favMovies.length === 0 ? ( 
          <h4>You haven't added any movies! </h4>
        ) : (
          <>  
            {favMovies.map((movie)=>(
              <Col xs={12} md={6} lg={3} key={movie._id} className="fav-movie">
                  <MovieCard 
                    key={movie._id}
                    movie={movie}
                    // toggleFavorite={handleToggle} 
                    />
                  <Button onClick = {removeFavoriteMovie}> Remove </Button>
              </Col>
            ))}              
          </>
          )}
      </Row>
    </Card.Body>
  </Card>
);
};


/* OLD CODE was in between <Col> where moviecard is
<Figure>
      <Link to = {"/movies/${_id}"}>
        <Figure.Image  
          src={movie.ImagePath} 
          alt= {movie.Title}
        />
        <Figure.Caption>
        {movie.Title}
        </Figure.Caption>
        </Link>
  /Figure> */



// export default FavoritesView

/* 
return (
    <Row className="justify-content-center">
        <h3>Favorite movies:</h3>
            {favMovies.length ? (
              favMovies.map ((movie) => (
                <MovieCard movie={movie} />
            ))
            ) : (
              <p>There are no movies in your favorites!</p>
            )}
            <Button variant="secondary" size="xs" onClick = {()=>removeFav(movie._id)}> Remove from Favorites </Button>         
    </Row>  
)
}
*/