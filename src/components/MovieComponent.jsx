import FavouriteButton from "./FavouriteButton";

function MovieComponent({
  movie,
  onHandleClick,
  onAddWatched,
  onDeleteWatched,
}) {
  // Geef voor elke opgehaalde film een klein kaartje terug met daarin verschillende soorten informatie uit de array.
  return (
    <div
      className="small-card-wrapper"
      onClick={() => {
        onHandleClick(movie.id);
      }}
    >
      <div className="small-card-left">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={`${movie.title}-poster`}
          className="movie-poster"
        />
      </div>
      <div className="small-card-middle">
        <div className="small-card-item">
          <b>{movie.title}</b>
        </div>
        <div className="small-card-item">
          {movie.overview}
        </div>
      </div>
      <div className="small-card-right">
      <div className="small-card-item">
        <FavouriteButton
          movie={movie}
          onAddWatched={onAddWatched}
          onDeleteWatched={onDeleteWatched}
        />
      </div>
        <div className="small-card-item">
          {Math.floor(movie.vote_average)}/10
        </div>

        
      </div>
    </div>
  );
}

export default MovieComponent;
