import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import SignUp from "./pages/Signup";
import Home from "./pages/Home";
import FilterMovies from "./pages/FilterMovies";
import RandomMovie from "./pages/RandomMovie";
import CategoriesSearch from "./pages/CategoriesSearch";
import SignIn from "./pages/SignIn";
import FavouriteMovies from "./pages/FavouriteMovies";
import { useLocalStorageState } from "./customHooks/useLocalStorageState";

function App() {
  const [fav, setFav] = useLocalStorageState([], "fav");

  function handleAddWatched(movie) {
    setFav((fav) => [...fav, movie]);
  }

  function handleDeleteWatched(id) {
    setFav((fav) => fav.filter((movie) => movie.id !== id));
  }

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route
            index
            element={
              <SignIn
                fav={fav}
                onAddWatched={handleAddWatched}
                onDeleteWatched={handleDeleteWatched}
              />
            }
          />
          <Route
            path="signup"
            element={
              <SignUp
                fav={fav}
                onAddWatched={handleAddWatched}
                onDeleteWatched={handleDeleteWatched}
              />
            }
          />
          <Route
            path="home"
            element={
              <Home
                fav={fav}
                onAddWatched={handleAddWatched}
                onDeleteWatched={handleDeleteWatched}
              />
            }
          />
          <Route
            path="filter"
            element={
              <FilterMovies
                fav={fav}
                onAddWatched={handleAddWatched}
                onDeleteWatched={handleDeleteWatched}
              />
            }
          />
          <Route
            path="random"
            element={
              <RandomMovie
                fav={fav}
                onAddWatched={handleAddWatched}
                onDeleteWatched={handleDeleteWatched}
              />
            }
          />
          <Route
            path="categories"
            element={
              <CategoriesSearch
                fav={fav}
                onAddWatched={handleAddWatched}
                onDeleteWatched={handleDeleteWatched}
              />
            }
          />
          <Route
            path="favouriteMovies"
            element={
              <FavouriteMovies
                fav={fav}
                onAddWatched={handleAddWatched}
                onDeleteWatched={handleDeleteWatched}
              />
            }
          />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
