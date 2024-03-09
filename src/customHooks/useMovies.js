import { useEffect, useState } from "react";
import { options } from "../config/apiOptions";
import axios from "axios";

function useMovies(query, searchType) {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    let urlFetch;
    if (searchType === "keyword") {
      urlFetch = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1?api_key=23a150bffcd79b25a828e7e8c76290dc`;
    }

    if (searchType === "categories") {
      urlFetch = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${query}?api_key=23a150bffcd79b25a828e7e8c76290dc`;
    }
    try {
      setLoading(true);
      const fetchData = async () => {
        const response = await axios.get(urlFetch, options);

        const movies = response.data.results;
        setMovies(movies);
      };
      fetchData();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [query, searchType]);
  return [movies, loading];
}

export default useMovies;
