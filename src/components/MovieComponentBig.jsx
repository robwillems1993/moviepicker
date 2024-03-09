import FavouriteButton from "./FavouriteButton";

function MovieComponentBig({ movie }) {
    // Geef voor de film waarop geklikt is een grote kaart terug met daarin verschillende soorten informatie uit de array.
    return (
      <div className="big-card-container">
        <div className="big-card-upper">
            <div className="upper-left">
                <FavouriteButton movie={movie} />
            </div>
            <div className="upper-middle">
                <div className="big-card-item">
                    <b>
                        {movie.title}
                    </b>
                </div>
                <div className="big-card-item">
                    Genre: {movie?.genres[0]?.name}
                </div>
                <div className="big-card-item">
                    Release date: {movie?.release_date}
                </div>
                <div className="big-card-item">
                    Score: {Math.floor(movie?.vote_average)}/10
                </div>
            </div>
            <div className="upper-right">
                <img
                    src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                    alt={`${movie.title}-poster`}
                />
            </div>
        </div>
        <div className="big-card-lower">
            <p className="big-card-overview"><b>Overview:</b> {movie?.overview}</p>
        </div>
      </div>
    );
  }
  export default MovieComponentBig;