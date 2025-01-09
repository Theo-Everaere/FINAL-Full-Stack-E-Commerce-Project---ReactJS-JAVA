import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import useUserProducts from "../../hooks/useUserProducts";
import ProductList from "../productsList/ProductList";
import axios from "axios";

import styles from "./userProducts.module.css";

const UserProducts = () => {
  const { user, token } = useContext(UserContext);
  const navigate = useNavigate();

  const { products, isLoading, isError } = useUserProducts(user?.id, token);

  const [userProducts, setUserProducts] = useState(products || []);

  useEffect(() => {
    setUserProducts(products);
  }, [products]);

  const handleDeleteProduct = (productId) => {
    if (!productId) {
      console.log("ID du produit manquant");
      return;
    }

    axios
      .delete(`http://localhost:8080/api/product/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Produit supprimé avec succès:", response.data);
        setUserProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression du produit:", error);
      });
  };

  const handleEditProduct = (productId) => {
    console.log("Modifier le produit avec ID:", productId);
  };

  const handleAddProduct = () => {
    navigate("/products/add");
  };

  return (
    <div className={styles.userProducts}>
      <h2>{`Mes Produits (${products.length})`}</h2>
      {isLoading && <p>Chargement des produits...</p>}
      {isError && products.length < 0 && (
        <p>Une erreur est survenue lors du chargement des produits.</p>
      )}
      {userProducts?.length > 0 ? (
        <ProductList
          products={userProducts}
          onDelete={handleDeleteProduct}
          onEdit={handleEditProduct}
        />
      ) : (
        <div>
          <p>Vous n&apos;avez pas de produits.</p>
        </div>
      )}
      <div className={styles["userProducts-add-btn"]}>
        <button className={styles.addProductBtn} onClick={handleAddProduct}>
          Ajouter un produit
        </button>
      </div>
    </div>
  );
};

export default UserProducts;
