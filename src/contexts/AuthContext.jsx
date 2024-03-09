import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});


export function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState({
    isAuth: false,
    user: null,
  });
  const navigate = useNavigate();

  // check of er een token in de localstorage zit. Zo ja, log de gebruiker in met de token. Zo niet, zet de auth op false, null.  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      login(token);
    } else {
      setAuth({
        isAuth: false,
        user: null,
      });
    }
  }, []);

  // login functie 
  async function login(token) {
    // maak een nieuw item (key naam) in de localstorage en voeg de token (waarde) daaraan toe
    localStorage.setItem("token", token);
    // decodeer de token van de gebruiker
    const decodedToken = jwtDecode(token);
    // vraag gegevens op uit de fake back-end
    try {
      const response = await axios.get(
        `http://localhost:3000/600/users/${decodedToken.sub}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        }
      );
      // stuur de gebruiker door naar /home
      navigate("/home");
      // vul de auth met true en de gegevens van de gebruiker
      setAuth({
        isAuth: true,
        user: {
          username: response.data.username,
          password: response.data.password,
          id: response.data.id,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  // logout funtie waar de auth weer op false en null gezet wordt
  function logout() {
    setAuth({
      isAuth: false,
      user: null,
    });
    navigate("/");
  }

  const contextData = {
    isAuth: auth.isAuth,
    login: login,
    logout: logout,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
}
