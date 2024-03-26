import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { options } from "../config/apiOptions";
import MovieComponent from "../components/MovieComponent";
import MovieComponentBig from "../components/MovieComponentBig";
import axios from "axios";

function FavouriteMovies({ fav, onAddWatched, onDeleteWatched }) {
  
  const [movie, setMovie] = useState(null);
  const [id, setId] = useState(null);

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
      <div className="page-container">
        <div className="page-left">
        <div className="movie-container-small">
          {fav.length > 0
            ? fav.map((movie) => 
              <MovieComponent 
                key={movie.id} 
                movie={movie} 
                onHandleClick={handleClick}
              />
            )
            : "No Favourites Movies "}
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

export default FavouriteMovies;
