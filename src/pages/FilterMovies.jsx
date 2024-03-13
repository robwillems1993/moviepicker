import { useEffect, useState } from "react";
import { options } from "../config/apiOptions";
import MovieComponent from "../components/MovieComponent";
import MovieComponentBig from "../components/MovieComponentBig";
import Navbar from "../components/Navbar";
import axios from "axios";

function FilterMovies({ onAddWatched, onDeleteWatched }) {
  const [votes, setVotes] = useState(20000);
  const [metric, setMetric] = useState("gte");
  const [movies, setMovies] = useState(null);
  const [movie, setMovie] = useState(null);
  const [id, setId] = useState(null);


  // Vraag films op met de filters die de gebruiker heeft aangegeven. metric is lager/hoger en votes is het aantal stemmen.
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&vote_count.${metric}=${votes}`,
        options
      );
      const data = response.data.results;
      setMovies(data);
    }
    fetchData();
  }, [votes, metric]);

  // Als er een klein kaartje wordt aangeklikt, pak dan het ID van die film
  function handleClick(id) {
    setId(id);
  }
  // Vraag alle gegevens op van de film met het aangeklikte ID.
  useEffect(() => {
    async function fetchMovieData(id) {
      // als er geen ID beschikbaar is, sla de rest dan over.
      if (!id) return;
      // als dat wel het geval is, zoek dan de film op.
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
      <div>
        <div className="second-menu-container">
          <div className="filer-menu-top">
            <p className="second-menu-text">Filter on number of votes.</p>
          </div>
          <div className="filter-menu-bottom">
            <div className="filter-menu-left">
              <p id="filter-explanation">Number of votes:</p>
              <select
                className="selector"
                value={votes}
                onChange={(event) => {
                  setVotes(event.target.value);
                }}
              >
                <option value={2000}>2000</option>
                <option value={5000}>5000</option>
                <option value={10000}>10000</option>
                <option value={20000}>20000</option>
                <option value={30000}>30000</option>
              </select>
            </div>
            <div className="filter-menu-right">
              <p id="filter-explanation">Lesser or greater:</p>
              <select
                className="selector"
                value={metric}
                onChange={(event) => {
                  setMetric(event.target.value);
                }}
              >
                <option value="lte">less than</option>
                <option value="gte">greater than</option>
              </select>
            </div>
          </div>
        </div>
        <div className="page-container">
          <div className="page-left">
              <div className="movie-container-small">
                {movies?.map((movie) => (
              <div key={movie.id}>
                <MovieComponent
                  movie={movie}
                  onAddWatched={onAddWatched}
                  onDeleteWatched={onDeleteWatched}
                  onHandleClick={handleClick}
                />
              </div>
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
      </div>
    </>
  );
}

//  NO. votes -> 2000,5000,10000,20000
// 2 option -> greater than , less than

export default FilterMovies;
