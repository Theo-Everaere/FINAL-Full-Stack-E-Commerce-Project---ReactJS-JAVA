import styles from "./orderDetails.module.css";

const OrderDetails = ({ item }) => {
  return (
    <li className={styles.orderItemDetails}>
      {item.imageUrl ? (
        <img
          src={item.imageUrl}
          alt={item.name}
          className={styles.orderItemImage}
        />
      ) : (
        <div className={styles.placeholder}></div>
      )}

      <div className={styles.itemDetails}>
        <p>Produit: {item.name || "Nom non disponible"}</p>
        <p>Quantité: {item.quantity}</p>
        <p>Prix unitaire: {item.unitPrice} €</p>
      </div>
    </li>
  );
};

export default OrderDetails;
