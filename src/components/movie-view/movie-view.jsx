import { Card, Container, Row, Col} from 'react-bootstrap';
import './movie-view.scss';

export const MovieView = ({ movie, onBackClick }) => {
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
                <button onClick={onBackClick} className="back-button" style={{ cursor: "pointer" }}>Back</button>
                </div>
                </Card.Text>
              </Card.Body> 
            </Card>
          </Col>
        </Row> 
      </Container> 
    );
  };
  
  /* OLD CODE
  <div>
        <div>
          <img src={movie.image} className="w-100" />
        </div>
        <div>
          <span>Title: </span>
          <span>{movie.title}</span>
        </div>
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
        <button onClick={onBackClick} className="back-button" style={{ cursor: "pointer" }}>Back</button>
      </div> */