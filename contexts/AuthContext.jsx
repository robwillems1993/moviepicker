import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});


export function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState({
    isAuth: false,
    user: {
      username: null,
      email: null,
      password: null,
      info: null,
      id: null,
    },
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
        user: {
          username: null,
          email: null,
          password: null,
          info: null,
          id: null,
        },
      });
    }
  }, []);

  // login functie 
  async function login(token, username) {
    // maak een nieuw item (key naam) in de localstorage en voeg de token (waarde) daaraan toe
    localStorage.setItem("token", token);
    // vraag gegevens op uit de Novi back-end
    if (username) {
      try {
        const response = await axios.get(
            `https://api.datavortex.nl/moviechooser/users/${username}`,
            {
              headers: {
                "Content-Type": "application/json",
                'X-Api-Key': 'moviechooser:kcNpqduBpZppwTbnUvwI',
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
            email: response.data.email,
            password: response.data.password,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  // logout funtie waar de auth weer op false en null gezet wordt
  function logout() {
    setAuth({
      isAuth: false,
      user: {
        username: null,
        email: null,
        password: null,
      },
    });
    localStorage.setItem("token", null);
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
