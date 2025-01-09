import OrderDetails from "../orderDetails/OrderDetails";
import styles from "./orderItem.module.css";

const OrderItem = ({ order }) => {
  return (
    <div className={styles.orderItem}>
      <div className={styles.orderInfo}>
        <h3>Numéro de commande n°{order.id}</h3>
        <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
        <p>Prix total: {order.totalPrice} €</p>
      </div>
      <ul className={styles.orderItems}>
        {order.items.map((item) => (
          <OrderDetails key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default OrderItem;
