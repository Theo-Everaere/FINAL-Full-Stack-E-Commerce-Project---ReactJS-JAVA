import { useState, useEffect } from "react";
import axios from "axios";

const useUserProducts = (userId, token) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (userId && token) {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/user/${userId}/products`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const productsWithImagesAndAvailability = await Promise.all(
            response.data.map(async (product) => {
              try {
                const imageResponse = await axios.get(
                  `http://localhost:8080/api/product/${product.id}/image`,
                  { responseType: "blob" }
                );
                const imageUrl = URL.createObjectURL(imageResponse.data);

                return {
                  ...product,
                  imageUrl,
                  available: product.quantity > 0, // Ajoutez la disponibilité en fonction de la quantité
                };
              } catch (error) {
                console.error(
                  "Erreur lors de la récupération de l'image",
                  error
                );
                return { ...product, available: product.quantity > 0 }; // Même gestion si l'image échoue
              }
            })
          );

          setProducts(productsWithImagesAndAvailability);
          setIsLoading(false);
          setIsError(false);
        } catch (error) {
          console.error("Erreur lors de la récupération des produits:", error);
          setIsError(true);
          setIsLoading(false);
        }
      };

      fetchProducts();
    }
  }, [userId, token]);

  return { products, setProducts, isLoading, isError };
};

export default useUserProducts;
