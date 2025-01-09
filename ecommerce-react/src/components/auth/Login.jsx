import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import styles from "./login.module.css";

const Login = ({ onSuccess }) => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [responseMessage, setResponseMessage] = useState("");
  const { login } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        loginData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { token, user } = response.data;
      login(token, user);
      onSuccess();
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setResponseMessage(
        "Erreur lors de la connexion. Vérifiez vos identifiants."
      );
    }
  };

  return (
    <div className={styles.loginFormContainer}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom d&apos;utilisateur:</label>
          <input
            type="text"
            name="username"
            value={loginData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mot de passe:</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default Login;
