import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./editProduct.module.css";

const EditProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    releaseDate: "",
    available: false,
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/products/${productId}`)
      .then((response) => {
        const productData = response.data;

        if (productData.releaseDate) {
          productData.releaseDate = productData.releaseDate.split("T")[0];
        }

        // Vérifier et ajuster la disponibilité en fonction de la quantité
        productData.available = productData.quantity > 0;

        setProduct(productData);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du produit:", error);
      });
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10); // Assurer que la quantité est bien un nombre entier
    let newAvailability = newQuantity > 0; // Si la quantité est > 0, le produit est disponible

    // Si la quantité est 0, rendre disponible à false, sinon l'utilisateur peut choisir
    if (newQuantity === 0) {
      newAvailability = false;
    }

    setProduct({
      ...product,
      quantity: newQuantity,
      available: newAvailability,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Token manquant. Veuillez vous connecter.");
      return;
    }

    const formData = new FormData();
    if (image) {
      formData.append("imageFile", image);
    }
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );

    axios
      .put(`http://localhost:8080/api/products/${productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Produit mis à jour avec succès:", response.data);
        alert("Produit mis à jour avec succès");
        navigate("/products");
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour du produit:", error);
        alert("Erreur lors de la mise à jour du produit");
      });
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.editProductTitle}>Modifier le Produit</h2>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label className={styles.formLabel}>Nom du Produit</label>
          <input
            type="text"
            className={styles.formInput}
            placeholder="Nom du Produit"
            onChange={handleInputChange}
            value={product.name}
            name="name"
          />
        </div>
        <div className="form-group">
          <label className={styles.formLabel}>Marque</label>
          <input
            type="text"
            name="brand"
            className={styles.formInput}
            placeholder="Entrez la Marque"
            value={product.brand}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label className={styles.formLabel}>Description</label>
          <textarea
            className={styles.formTextArea}
            placeholder="Ajouter une description du produit"
            value={product.description}
            name="description"
            onChange={handleInputChange}
            rows="4"
          />
        </div>
        <div className="form-group">
          <label className={styles.formLabel}>Prix</label>
          <input
            type="number"
            className={styles.formInput}
            placeholder="Ex: 1000€"
            onChange={handleInputChange}
            value={product.price}
            name="price"
          />
        </div>

        <div className="form-group">
          <label className={styles.formLabel}>Catégorie</label>
          <select
            className={styles.formSelect}
            value={product.category}
            onChange={handleInputChange}
            name="category"
          >
            <option value="">Sélectionner la catégorie</option>
            <option value="musical-instruments">Instruments de musique</option>
            <option value="food">Nourriture</option>
            <option value="mobile-phone">Téléphone mobile</option>
          </select>
        </div>
        <div className="form-group">
          <label className={styles.formLabel}>Quantité en Stock</label>
          <input
            type="number"
            className={styles.formInput}
            placeholder="Stock restant"
            onChange={handleQuantityChange}
            value={product.quantity}
            name="quantity"
            min={0}
          />
        </div>
        <div className="form-group">
          <label className={styles.formLabel}>Date de Lancement</label>
          <input
            type="date"
            className={styles.formInput}
            value={product.releaseDate}
            name="releaseDate"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label className={styles.formLabel}>Image</label>
          <input
            className={styles.formInput}
            type="file"
            onChange={handleImageChange}
          />
        </div>
        <div className="form-group">
          <div className={styles.formCheck}>
            <input
              className={styles.formCheckInput}
              type="checkbox"
              name="available"
              checked={product.available}
              onChange={(e) =>
                setProduct({ ...product, available: e.target.checked })
              }
              disabled={product.quantity === 0} // Désactive si quantité == 0
            />
            <label className={styles.formCheckLabel}>Produit Disponible</label>
          </div>
          {product.quantity === 0 && (
            <p className={styles.productUnavailableMessage}>
              Ce produit est actuellement indisponible car la quantité est à
              zéro.
            </p>
          )}
        </div>

        <div className="form-group">
          <button type="submit" className={styles.submitButton}>
            Soumettre
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
