import { useEffect, useState } from "react";
import useMovies from "../customHooks/useMovies";
import { options } from "../config/apiOptions";
import MovieComponent from "../components/MovieComponent";
import MovieComponentBig from "../components/MovieComponentBig";
import Navbar from "../components/Navbar";
import axios from "axios";

function Home({ onAddWatched, onDeleteWatched }) {
  const [userInput, setUserInput] = useState("");
  const [landingMovies, setLandingMovies] = useState([]);
  const [movies, loading] = useMovies(userInput, "keyword");
  const [movie, setMovie] = useState(null);
  const [id, setId] = useState(null);

  function handleClick(id) {
    setId(id);
  }

  useEffect(() => {
    const urlFetch =
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc?api_key=23a150bffcd79b25a828e7e8c76290dc";

    const fetchData = async () => {
      try {
        const response = await axios.get(urlFetch, options);
        const movies = response.data.results;
        setLandingMovies(movies);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchMovieData(id) {
      if (!id) return;
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}`,
        options
      );
      setMovie(response.data);
    }
    fetchMovieData(id);
  }, [id]);
  return (
    <>
      <div className="header">
        <Navbar />
      </div>
      <div className="second-menu-container">
        <input
          type="text"
          value={userInput}
          onChange={(event) => setUserInput(event.target.value)}
          placeholder="Type the movie title"
          className="searchbar"
        />
      </div>
      <div className="page-container">
        <div className="page-left">
          {loading ? (
            "loading..."
          ) : (
            <div className="movie-container-small">
              {movies.map((movie) => (
                <MovieComponent
                  key={movie.id}
                  movie={movie}
                  onHandleClick={handleClick}
                  onAddWatched={onAddWatched}
                  onDeleteWatched={onDeleteWatched}
                />
              ))}
            </div>
          )}
          {userInput ? null : (
            <div className="movie-container-small">
              {landingMovies.map((movie) => (
                <MovieComponent
                  key={movie.id}
                  movie={movie}
                  onHandleClick={handleClick}
                  onAddWatched={onAddWatched}
                  onDeleteWatched={onDeleteWatched}
                />
              ))}
            </div>
          )}
        </div>
        <div className="page-divider-container">
          <div className="page-divider"></div>
        </div>
        <div className="page-right">
          {!movie ? null : (
              <MovieComponentBig
                  key={movie.id}
                  movie={movie}
                  onAddWatched={onAddWatched}
                  onDeleteWatched={onDeleteWatched}
                />
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
