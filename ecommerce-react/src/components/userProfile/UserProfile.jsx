import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import UserProducts from "../userProducts/UserProducts";
import UserOrders from "../userOrders/UserOrders";
import styles from "./userProfile.module.css";

const UserProfile = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/authentication");
  };

  const handleLogin = () => {
    navigate("/authentication");
  };

  if (!user) {
    return (
      <div className={styles.userProfile}>
        <p className={styles.errorMessage}>
          Veuillez vous connecter pour accéder à votre profil.
        </p>
        <button onClick={handleLogin}>Se connecter</button>
      </div>
    );
  }

  const usernameWithCapitalLetter =
    user.username.charAt(0).toUpperCase() + user.username.slice(1);

  return (
    <div className={styles.userProfile}>
      <h1>Profil de {usernameWithCapitalLetter}</h1>
      <p>Email: {user.email}</p>
      <button className={styles.logout} onClick={handleLogout}>
        Se déconnecter
      </button>

      <UserProducts />
      <UserOrders />
    </div>
  );
};

export default UserProfile;
