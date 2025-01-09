import { Link } from "react-router-dom";
import styles from "./productCard.module.css";
import PropTypes from "prop-types";

const ProductCard = ({
  id,
  name,
  description,
  price,
  available,
  imageUrl,
  onAddToCart,
}) => {
  return (
    <div className={styles.cardsContainer}>
      <div className={styles.productCard}>
        {imageUrl ? (
          <img
            src={imageUrl || "../../assets/placeholder-image.jpg"}
            alt={name}
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
        ) : (
          <div className={styles.noImage}>Aucune image disponible</div>
        )}
        <h3>{name}</h3>
        <p>{description}</p>
        <p>Prix : {price} €</p>
        <p>{available ? "En stock" : "Indisponible"}</p>
        {available && (
          <button
            className={styles.productCardButton}
            onClick={() => onAddToCart(id)}
          >
            Ajouter au panier
          </button>
        )}
        <Link
          to={`/product/${id}`}
          state={{ imageUrl: imageUrl }}
          className={styles.productCardLink}
        >
          Détails
        </Link>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  available: PropTypes.bool.isRequired,
  imageUrl: PropTypes.string,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductCard;
