import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      image:
        "",
      title: "Silence of the Lambs",
      description: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer.",
      genre: "Thriller",
      director: "Jonathon Demme",
      release: "1991"
    },
    {
      id: 2,
      image:
        "",
      title: "High Fidelity",
      description: "Rob, a record store owner and compulsive list maker, recounts his top five breakups, including the one in progress.",
      genre: "Comedy",
      director: "Stephen Frears",
      release: "2000"
    },
    {
      id: 3,
      image:
        "",
      title: "Psycho",
      description: "A Phoenix secretary embezzles $40,000 from her employer's client, goes on the run and checks into a remote motel. The motel is managed by a quiet young man called Norman who seems to be dominated by his mother.",
      genre: "Horror",
      director: "Alfred Hitchcock",
      release: "1960"
    },
    {
      id: 4,
      image:
        "",
      title: "Kill Bill",
      description: "After awakening from a four-year coma, a former assassin wreaks vengeance on the team of assassins who betrayed her.",
      genre: "Action",
      director: "Quentin Tarantino",
      release: "2003"
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};

