import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

function Navbar() {


  const { isAuth, logout } = useContext(AuthContext);

  return (
    // Navigatiebalk met daarin alle pagina's en bijpassende doorverwijzing
    <nav className="navigationbar">
      <ul className="navigation-list">
        <NavLink to="/home" className="nav-button">
          Home
        </NavLink>
        <NavLink to="/random" className="nav-button">
          Random
        </NavLink>
        <NavLink to="/categories" className="nav-button">
          Categories
        </NavLink>
        <NavLink to="/filter" className="nav-button">
          Filters
        </NavLink>
        <NavLink to="/favouriteMovies" className="nav-button">
          Favourites
        </NavLink>
        
        {isAuth ? (
          <button onClick={logout} className="nav-button">
            <p className="nav-button">Logout</p>
          </button>
        ) : (
          <>
            <NavLink to="/register" className="nav-button">
              Register
            </NavLink>
            <NavLink to="/" className="nav-button">
              Signin
            </NavLink>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
