import React from "react";
import { Button, Link, Figure, Col, Row, Card } from "react-bootstrap";
import { ProfileView } from "../profile-view/profile-view";
import { MovieCard } from "../movie-card/movie-card";

export const FavMovies = ({ favMovies, removeFav }) => { 
  
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
                    movie={movie} />
                  <Button onClick = {()=>removeFav(movie._id)}> Remove </Button>
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