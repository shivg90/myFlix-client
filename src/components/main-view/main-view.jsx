import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view"; 
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // useEffect hook allows React to perform side effects in component e.g fetching data
  useEffect(() => {
    if (!token) {
      return;
    }
    // set loading before sending API request
    setLoading(true);
    fetch(`https://movieapi-9rx2.onrender.com/movies`, {
      headers: {Authorization: `Bearer ${token}`}
    })
      .then((response) => response.json())
      .then((data) => {
        // stops loading after response received
        setLoading(false);
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
      })
  }, [token])

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
                  <Navigate to="/" /> // if no user 'Navigate' redirects to login page
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
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => {setUser(user); setToken(token);}} /> 
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
                  <Navigate to="/login" replace />
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
                    <ProfileView user={user} movies={movies} />
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
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie._id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
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
                    
                    
                    
                /* OLD CODE 2
                  // displays movie-view when movie is clicked
                ) : selectedMovie ? (
                  <Col md={8} style={{ border: "1px solid black" }}>
                  <MovieView 
                    movie={selectedMovie} 
                    onBackClick={() => setSelectedMovie(null)} 
                  />
                  <Button variant="secondary" size="sm" onClick={() => {setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
                  </Col>
                  // displays text message if list of movies is empty
                ) : movies.length === 0 ? (
                  <p>The list is empty!</p>
                  
                ) : loading ? (
                  // displays movie-card with logout button, if user does not select a movie
                      <p>Loading...</p>
                    ) : !movies || !movies.length ? (
                      <p>No movies found</p>
                    ) : (
                      <>
                    {movies.map((movie) => (
                      <Col key={movie._id} md={3}>
                      <MovieCard
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                          setSelectedMovie(newSelectedMovie);
                        }}
                      />
                      </Col>
                    ))}
                    <Button md="1" variant="secondary" size="sm" onClick={() => {setUser(null);}}>Logout</Button>
                  </>
                )}
      </Row>
    );
  }; */


      
  /* OLD CODE
  // user must first either login or signup
  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
        or
        <SignupView />
      </>
    )
  }

  // displays movie-view when movie is selected (clicked)
  if (selectedMovie) {
    return (
      <>
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear();
      }}
      > Logout 
      </button>
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
      </>
    );
  }

  // displays text message if list of movies is empty
  if (movies.length === 0) {
    return (
      <>
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear();
      }}
      > Logout
      </button>
      <div>The list is empty!</div>
    </>
    );
  }

  // displays movie-card with logout button, if user does not select a movie 
  return (
    // conditional rendering for loading statment
    loading ? (
      <p>Loading...</p>
    ) : !movies || !movies.length ? (
      <p>No movies found</p>
    ) : (
    <div>
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear();
      }}
    > Logout
    </button>
    
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  ));
} */

