import { useState, useEffect } from "react";

const useProducts = (url) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Erreur lors du chargement des produits");
        }
        const data = await response.json();

        const productsWithImages = await Promise.all(
          data.map(async (product) => {
            try {
              const imageResponse = await fetch(
                `http://localhost:8080/api/product/${product.id}/image`
              );
              if (!imageResponse.ok) {
                throw new Error("Erreur lors du chargement de l'image");
              }
              const imageBlob = await imageResponse.blob();
              const imageUrl = URL.createObjectURL(imageBlob);
              return { ...product, imageUrl };
            } catch (error) {
              console.error("Erreur lors du chargement de l'image", error);
              return { ...product };
            }
          })
        );

        setProducts(productsWithImages);
        setIsError(false);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [url]);

  return { products, isLoading, isError };
};

export default useProducts;
