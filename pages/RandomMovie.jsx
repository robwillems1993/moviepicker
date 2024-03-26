import { useEffect, useState } from "react";
import { options } from "../config/apiOptions";
import Navbar from "../components/Navbar";
import MovieComponent from "../components/MovieComponent";
import MovieComponentBig from "../components/MovieComponentBig";
import axios from "axios";

// functie om een random getal te genereren
function getRandomNumber(number) {
  const randomNumber = Math.random();
  const scaledNumber = Math.floor(randomNumber * (number + 1));
  return scaledNumber;
}

function RandomMovie({ onAddWatched, onDeleteWatched }) {
  const [movie, setMovie] = useState("");
  const [selectedMovie, setselectedMovie] = useState(null);
  const [id, setId] = useState(null);



  // Vraagt de films op van de endpoint en converteert het van een binnenkomend object naar een bruikbare array.
  // Vervolgens wordt er een random getal gegenereert. Dit getal is het indexnummer van de positie in de array van de willekeurige film die de app laat zien.
  const urlFetch =
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc?api_key=23a150bffcd79b25a828e7e8c76290dc";
  const fetchData = async () => {
    const response = await fetch(urlFetch, options);
    const data = await response.json();
    const movies = data.results;
    const random = getRandomNumber(movies.length);
    setMovie(movies[random]);
  };

  // Functie om de opgehaalde film te "clearen"
  const clearMovie = () => {
    setMovie("");
    setselectedMovie("")
  };
  
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
      setselectedMovie(response.data);
    }
    fetchMovieData(id);
  }, [id]);

  return (
    <>
      <div className="header">
        <Navbar />
      </div>
      <div className="second-menu-container">
        <div className="button-container">
          <button
            className="generate random-button"
            onClick={fetchData}
          >
            Generate Random
          </button>
          <button 
            className="clear random-button" 
            onClick={clearMovie}>
            Clear
          </button>
        </div>
      </div>
      <div className="page-container">
        <div className="page-left">
          {!movie ? (<p className="random-explanation">Click "Generate Random" to select your first random movie.</p>) : (
            <div className="movie-container-small">
            {movie ? (
          <MovieComponent
            movie={movie}
            onAddWatched={onAddWatched}
            onDeleteWatched={onDeleteWatched}
            onHandleClick={handleClick}
          />
          ) : null}
          </div>
          )}
            
        </div>
        <div className="page-divider-container">
          <div className="page-divider"></div>
        </div>
        <div className="page-right">
          {!selectedMovie ? null : (
              <MovieComponentBig
                  key={selectedMovie.id}
                  movie={selectedMovie}
                  onAddWatched={onAddWatched}
                  onDeleteWatched={onDeleteWatched}
                />
          )}
        </div>
      </div>
    </>
  );
}

export default RandomMovie;
