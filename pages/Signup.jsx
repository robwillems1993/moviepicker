import {useContext, useState} from "react";
import {NavLink} from "react-router-dom";
import {AuthContext} from "../contexts/AuthContext";
import axios from "axios";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("https://api.datavortex.nl/moviechooser/users", {
        username: username,
        email: email,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key':'moviechooser:kcNpqduBpZppwTbnUvwI',
        }
      });
      try {
        const token = await axios.post("https://api.datavortex.nl/moviechooser/users/authenticate", {
          username: username,
          password: password,
        });
        login(token.data.jwt,username);
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
    <div className="sign-page-container">
      <div className="sign-in-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
                type="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <NavLink to="/">Sign in</NavLink>
        </p>
      </div>
    </div>
    </>
  );
  
}

export default SignUp;
