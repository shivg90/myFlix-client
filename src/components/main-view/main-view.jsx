import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view"; 
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
//import { SearchBar } from "./search-bar"; // use if moving rendered search results to diff file
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { title } from "process";

export const MainView = () => {
  //const storedUser = localStorage.getItem("user");
  //const storedUser = JSON.parse(localStorage.getItem("user")); // JSON is undefined now?
  //const storedUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  
  const storedUser = null;
  const storedstoredUser = localStorage.getItem("user");
  if (storedstoredUser) {
    try {
      storedUser = JSON.parse(storedstoredUser);
  } catch (e) {}
  };

  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]); // existing state for move data
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [movieTitle, setMovieTitle] = useState(""); // new state for search results
  //const [loading, setLoading] = useState(false); // add loading state back in

  // useEffect hook allows React to perform side effects in component e.g fetching data
  useEffect(() => {
    if (!token) {
      return;
    }
    // set loading before sending API request
    //setLoading(true);
    fetch(`https://movieapi-9rx2.onrender.com/movies`, {
      headers: {Authorization: `Bearer ${token}`}
    })
      .then((response) => response.json())
      .then((data) => {
        // stops loading after response received
        //setLoading(false);
        console.log('data', data);

        const moviesFromApi = data.map((movie) => {

          return {
          // value names match to API database
          id: movie._id,
          title: movie.Title,
          image: movie.ImagePath,
          description: movie.Description,
          genre: movie.Genre.Name,
          director: movie.Director.Name,
          release: movie.Release
          }
        });

        setMovies(moviesFromApi);
        setFilteredMovies(moviesFromApi);
      })
  }, [token]) 

  /*useEffect(() => {
    const filteredMovies = movies.filter((movie) => movieTitle.includes(movie.id));
    setMovieTitle([filteredMovies]);
  }, [movies]); */
 

  // attempt at event handler for search function
  // when clicking submit "the list is empty" is returned
  const handleSearch = () => {
    const newData = movies.filter(x => x.movieTitle == movieTitle); 
    setMovies(newData); 
    console.log(movieTitle);
  };

  

   // 'if' statements are replaced by ternary operators '?:' - if true, if false, and combined into one peice of code wrapped in Row

  return (
    <BrowserRouter>
    <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                { user ? (
                  <Navigate to="/" /> // if user is validated redirects to homepage
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>

            }
          />
          <Route
            path="/login"
            element={
              <>
                { user ? (
                  <Navigate to="/" /> // if user is validated redirects to homepage
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user, token) => {setUser(user); setToken(token);}} /> 
                  </Col>
                )}
              </>

            }
          />
          <Route
            path="/movies/:movieId" 
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace /> // if user is not validated redirects to login page
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} username={user.Username} favoriteMovies={user.FavoriteMovies}/>
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/users" //"/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={8}>
                    <ProfileView 
                      user={user} 
                      movies={movies}  
                      onLoggedIn={(user, token) => { setUser(user); setToken(token) }}
                      onLoggedOut={() => { setUser(null); setToken(null); localStorage.clear(); }}
                    />
                  </Col>
                )}
              </>
            }
          />  
        
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
              <>
              <Row>
                <Col className="search-bar" md={4} style={{marginTop: 40, marginBottom: 30, justifyContent:"center"}}>
                  <label>Search</label>
                    <input type="text" icon="search" placeholder="search movie title" onChange={(e)=> setMovieTitle(e.target.value)}></input>
                    <Button onClick={()=> handleSearch()}>Search</Button>
                </Col>
              </Row>

              <>
                {movies.map((movie) => (
                  <Col className="mb-4" key={movie._id} md={3}>
                    <MovieCard movie={movie} />
                  </Col>
                ))}
              <>
                {filteredMovies && filteredMovies.length >0 ? 
                 filteredMovies.map((movie) => (
                <Col className="mb-4" key={movie._id} md={3}>
                  <MovieCard movie={movie} />
                </Col>
                ))
                : 'no movies'
              }
              </>
              </>
              </>
            )}
              </>
            } 
          />   
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
                    
            

