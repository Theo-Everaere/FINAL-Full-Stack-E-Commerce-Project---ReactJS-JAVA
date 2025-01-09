import PropTypes from "prop-types";
import styles from "./cart.module.css";

const Cart = ({
  cartItems,
  onRemoveFromCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
  isAuthenticated,
  onPlaceOrder,
}) => {
  const total = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    if (!isAuthenticated) {
      alert("Veuillez vous connecter pour passer une commande.");
      return;
    }

    const orderRequest = {
      items: cartItems.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
      })),
      totalPrice: total,
    };
    console.log("orderRequest on PlaceOrder: " + JSON.stringify(orderRequest));
    onPlaceOrder(orderRequest);
  };

  return (
    <div className={styles["cart-container"]}>
      <h2>Panier</h2>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.product.id} className={styles["cart-item"]}>
              <h3>{item.product.name}</h3>
              <p>Prix unitaire : {item.product.price} €</p>
              <p>Quantité : {item.quantity}</p>
              <div className={styles["cart-item-actions"]}>
                <div className={styles.quantityButtons}>
                  <button
                    className={styles.decreaseQuantityButton}
                    onClick={() => onDecreaseQuantity(item.product.id)}
                  >
                    -
                  </button>
                  <button
                    className={styles.increaseQuantityButton}
                    onClick={() => onIncreaseQuantity(item.product.id)}
                  >
                    +
                  </button>
                </div>
                <button
                  className={styles.removeProductButton}
                  onClick={() => onRemoveFromCart(item.product.id)}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
          <div className={styles["cart-total"]}>
            <h3>Total : {total.toFixed(2)} €</h3>
          </div>
          <div className={styles["cart-actions"]}>
            <button
              onClick={handlePlaceOrder}
              disabled={!isAuthenticated}
              className={`${styles["order-button"]} ${
                !isAuthenticated ? styles["disabled"] : ""
              }`}
            >
              Commander
            </button>
            {!isAuthenticated && (
              <p>Vous devez être connecté pour passer une commande.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      }).isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
  onIncreaseQuantity: PropTypes.func.isRequired,
  onDecreaseQuantity: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  onPlaceOrder: PropTypes.func.isRequired,
};

export default Cart;
