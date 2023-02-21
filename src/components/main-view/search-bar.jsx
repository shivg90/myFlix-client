/* import { useState } from "react";
import { Col, Row} from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card"; */

import { MovieCard } from "../movie-card/movie-card";


// test 1. at search/filter function
  /* const searchMovies = movies.filter((m) => m.movieTitle.includes(movie.id));
  return (
    {searchMovies.map((movie)=>(
      <MovieCard
        movie={movie}
      />
    ))
  }); */

  // test 2. at search/filter function
  /* let filteredMovies = [filterByTitle(movie.Title, movie._id)]

  const filterByTitle = (title, id) => {
    let filteredMovies = movies.filter((m)=> m.movieTitle === title && m._id !== id);
    
    return filteredMovies;
  }; */

//test 3. at search/filter function
/*export const SearchBar = () => {
    const [query, setQuery] = useState("");

    const filteredMovies = getFilteredMovies(query, movies);

    const getFilteredMovies = (query, movies) => {
        if(!query) {
            return movies;
        }
        return movies.filter((m) => m.movieTitle.includes(query));
    }; */
/*export const SearchBar = () => {
    const [query, setQuery] = useState("");
    
    const filteredMovies = getFilteredMovies(movie.Title, movie._id);
    
    const getFilteredMovies = (title, id) => {
        if(!title) {
          return movies;
        }
          return movies.filter((m) => m.movieTitle.includes(query));
        };


    return (
    <Row>
      <Col>
        <label>Search</label>
        <Input label="search" type="text" icon="search" onChange={e => setQuery(e.target.value)}></input>
        {filteredMovies.map((movie) => (
        <Col xs={12} md={6} lg={3} key={movie.id} className="fav-movie">
            <MovieCard movie={movie} />
        </Col>
      ))}
      </Col>
    </Row>
  );
} 
*/

export const SearchBar = () => {
    const {search} = this.state;
    
    state = {
        search : ""
    }

   

    if(search !== "" && MovieCard.Title.toLowerCase().indexOf( search ) === -1){
        return null
    }

    onChange = e =>{
        this.setState({search : e.target.value})
    }

    return (
        <Row>
            <Col className="search-bar" md={4} style={{marginTop: 40, marginBottom: 30, justifyContent:"center"}}>
            <label>Search</label>
                <Input label="search" type="text" icon="search" onChange={this.onChange}></Input>
            </Col>
        </Row>
    )


    
};

