import { useState, useEffect } from "react";
import axios from "axios";

// Hook personnalisé pour récupérer les commandes de l'utilisateur, avec les images des produits
const useUserOrders = (userId, token) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!userId || !token) return;

    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/api/order/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;

        if (Array.isArray(data)) {
          const ordersWithImages = await Promise.all(
            data.map(async (order) => {
              const itemsWithImages = await Promise.all(
                order.items.map(async (item) => {
                  try {
                    const imageResponse = await axios.get(
                      `http://localhost:8080/api/product/${item.productId}/image`,
                      { responseType: "blob" }
                    );
                    const imageUrl = URL.createObjectURL(imageResponse.data);
                    return { ...item, imageUrl };
                  } catch (error) {
                    console.error(
                      "Erreur lors de la récupération de l'image",
                      error
                    );
                    return { ...item };
                  }
                })
              );

              return { ...order, items: itemsWithImages };
            })
          );

          setOrders(ordersWithImages);
        } else {
          setOrders([]);
          console.error("La réponse n'est pas un tableau :", data);
        }
      } catch (error) {
        setIsError(true);
        console.error("Erreur lors de la récupération des commandes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [userId, token]);

  return { orders, isLoading, isError };
};

export default useUserOrders;
