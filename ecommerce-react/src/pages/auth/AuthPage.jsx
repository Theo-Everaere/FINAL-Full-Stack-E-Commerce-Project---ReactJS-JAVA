import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../../components/auth/Login";
import Register from "../../components/auth/Register";
import styles from "./authpage.module.css";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate("/user-profile");
  };

  const handleRegisterSuccess = () => {
    setIsLogin(true);
  };

  return (
    <div className={styles.authContainer}>
      <h1>{isLogin ? "Connexion" : "Inscription"}</h1>
      {isLogin ? (
        <Login onSuccess={handleLoginSuccess} />
      ) : (
        <Register onSuccess={handleRegisterSuccess} />
      )}
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin
          ? "Pas encore de compte ? S'inscrire"
          : "Déjà un compte ? Se connecter"}
      </button>
    </div>
  );
};

export default AuthPage;
