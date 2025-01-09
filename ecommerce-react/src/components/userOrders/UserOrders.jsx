import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import useUserOrders from "../../hooks/useUserOrders";
import OrderItem from "../orderItem/OrderItem";
import styles from "./userOrders.module.css";

const UserOrders = () => {
  const { user, token } = useContext(UserContext);
  const { orders, isLoading, isError } = useUserOrders(user?.id, token);

  return (
    <div className={styles.userOrders}>
      <h2>{`Mes Commandes (${orders.length})`}</h2>
      {isLoading && <p>Chargement des commandes...</p>}
      {isError && orders.length < 0 && (
        <p>Une erreur est survenue lors du chargement des commandes.</p>
      )}

      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </ul>
      ) : (
        <p>Aucune commande trouvée.</p>
      )}
    </div>
  );
};

export default UserOrders;
