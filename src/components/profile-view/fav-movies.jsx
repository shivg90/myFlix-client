import React from "react";
import { Button, Link, Figure, Col, Row, Card } from "react-bootstrap";


export const FavoritesView = ({favMovies, removeFav}) => {
  
return (
  <Card>
    <Card.Body>
      <Row>
        {favMovies.length === 0 ?(
          <h4>You haven't added any movies! </h4>
        ) : (
          <>  
            {favMovies.map((movies)=>(
              <Col xs={12} md={6} lg={3} key={movies._id} className="fav-movie">
                  <Figure>
                    <Link to = {"/movies/${_id}"}>
                      <Figure.Image  
                        src={movies.ImagePath} 
                        alt= {movies.Title}
                      />
                      <Figure.Caption>
                      {movies.Title}
                      </Figure.Caption>
                    </Link>
                    </Figure>

                    <Button onClick = {()=>removeFav(movies._id)}> Remove </Button>

              </Col>
            ))}              
          </>
          )}
      </Row>
    </Card.Body>
  </Card>
);
};






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