import { useState } from "react";
import axios from "axios";
import styles from "./register.module.css";

const Register = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setResponseMessage("Utilisateur créé avec succès !");
      onSuccess();
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      setResponseMessage("Erreur lors de l'inscription.");
    }
  };

  return (
    <div className={styles.registerFormContainer}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom d&apos;utilisateur:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mot de passe:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">S&apos;inscrire</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default Register;
