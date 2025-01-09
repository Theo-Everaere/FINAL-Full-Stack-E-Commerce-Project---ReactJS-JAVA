import { Link } from "react-router-dom";
import styles from "./home.module.css";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <h1>Hello World</h1>
      <p>
        Découvrez ma plateforme e-commerce, construite avec Java pour le backend
        et React pour le frontend.
      </p>

      <section className={styles.projectDescription}>
        <h2>À propos du projet</h2>
        <p className={styles.justifyDescription}>
          Ce projet est une plateforme d&#39;e-commerce développée en utilisant
          le framework <strong>Spring Boot</strong> pour le backend, qui permet
          de gérer une boutique en ligne avec des produits. Le backend est
          connecté à une base de données <strong>H2</strong>, une base de
          données légère et rapide utilisée pour le développement local et les
          tests.
        </p>
        <p className={styles.justifyDescription}>
          Les fonctionnalités implémentées dans cette application incluent la
          gestion des produits avec des opérations CRUD (Créer, Lire, Mettre à
          jour, Supprimer). L&#39;interface front-end est développée avec{" "}
          <strong>React</strong>, permettant une expérience utilisateur fluide
          et moderne.
        </p>
        <p>
          <Link to="/products" className={styles.productLink}>
            Voir les produits
          </Link>{" "}
          pour explorer notre catalogue.
        </p>
      </section>
    </div>
  );
};

export default Home;
