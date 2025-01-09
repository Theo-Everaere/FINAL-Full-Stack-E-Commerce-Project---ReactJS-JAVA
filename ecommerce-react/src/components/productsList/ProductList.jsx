import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./productList.module.css";

const ProductList = ({ products, onDelete, onEdit }) => {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    onEdit(id);
    navigate(`/edit-product/${id}`);
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible."
      )
    ) {
      onDelete(id);
    }
  };

  return (
    <div className={styles.productList}>
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className={styles.productItemList}>
            <div className={styles.productImage}>
              {product.imageUrl ? (
                <img
                  src={product.imageUrl || "../../assets/placeholder-image.jpg"}
                  alt={product.name}
                  className={styles.productImageImg}
                />
              ) : (
                <div className={styles.noImage}>Aucune image disponible</div>
              )}
            </div>
            <div className={styles.productInfo}>
              <div className={styles.productHeader}>
                <strong>{product.name}</strong>
                <span className={styles.price}>{product.price} €</span>
              </div>
              <div className={styles.availability}>
                (
                {product.quantity > 0
                  ? `Disponible - Stock: ${product.quantity}`
                  : "Indisponible"}
                )
              </div>
              <div className={styles.productDescription}>
                {product.description}
              </div>
            </div>
            <div className={styles.productActions}>
              <button
                className={styles.editButton}
                onClick={() => handleEdit(product.id)}
              >
                Modifier
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(product.id)}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>Aucun produit à afficher.</p>
      )}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ProductList;
