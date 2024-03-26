import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { options } from "../config/apiOptions";
import useMovies from "../customHooks/useMovies";
import MovieComponent from "../components/MovieComponent";
import MovieComponentBig from "../components/MovieComponentBig";
import axios from "axios";

function CategoriesSearch({ onAddWatched, onDeleteWatched }) {
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState("action");
  const [movie, setMovie] = useState(null);
  const [id, setId] = useState(null);


  // haal alle categorieen op.
  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?language=en?api_key=23a150bffcd79b25a828e7e8c76290dc",
        options
      );
      const data = await response.json();
      setGenres(data.genres);
    };
    getCategories();
  }, []);
  // Gebruik de customhook, geef het genre (categorie) mee en geef aan dat de meegestuurde variable een categorie betreft.
  const [movies] = useMovies(genre, "categories");

  // Als er een klein kaartje wordt aangeklikt, pak dan het ID van die film
  function handleClick(id) {
    setId(id);
  }
  // Vraag alle gegevens op van de film met het aangeklikte ID.
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
        <p className="second-menu-text">Choose a Genre:</p>
        <select 
          className="selector"
          value={genre}
          // Als er een categorie wordt aangeklikt, 'set' deze dan als genre in de state.
          onChange={(event) => {
            setGenre(event.target.value);
          }}
        >
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        </div>
        <div className="page-container">
          <div className="page-left">
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

export default CategoriesSearch;
