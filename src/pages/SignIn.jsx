import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email: email,
        password: password,
    })
      login(response.data.accessToken);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
    <div className="sign-page-container">
      <div className="sign-in-container">
        <h2>Sign In</h2>
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
        <button onClick={(e) => handleSubmit(e)}>Submit</button>
        <p>
          Dont have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
    </>
  );
}

export default SignIn;
