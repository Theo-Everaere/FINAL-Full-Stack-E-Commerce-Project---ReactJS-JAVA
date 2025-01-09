import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./addProduct.module.css";

const AddProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    quantity: 0, // Quantité initiale à 0
    releaseDate: "",
    available: false, // Disponibilité initiale à false
  });
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setErrors({ ...errors, image: "" });
  };

  // Gestion de la quantité et disponibilité
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);

    // Si la quantité est 0, l'état de disponibilité devient false
    const newAvailable = newQuantity > 0 ? product.available : false;

    setProduct({
      ...product,
      quantity: newQuantity,
      available: newAvailable, // Gère la disponibilité en fonction de la quantité
    });
  };

  // Validation des entrées utilisateur
  const validateInputs = () => {
    const newErrors = {};

    if (!product.name.trim()) newErrors.name = "Le nom du produit est requis.";
    if (!product.brand.trim()) newErrors.brand = "La marque est requise.";
    if (!product.description.trim())
      newErrors.description = "La description est requise.";
    if (!product.price || isNaN(product.price) || product.price <= 0)
      newErrors.price = "Un prix valide est requis.";
    if (!product.category.trim())
      newErrors.category = "La catégorie est requise.";
    if (isNaN(product.quantity) || product.quantity < 0)
      newErrors.quantity = "Une quantité valide est requise.";

    if (!product.releaseDate.trim())
      newErrors.releaseDate = "La date de lancement est requise.";
    if (!image) newErrors.image = "Une image est requise.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!validateInputs()) {
      alert("Veuillez corriger les erreurs avant de soumettre.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Token manquant. Veuillez vous connecter.");
      return;
    }

    const formData = new FormData();
    formData.append("imageFile", image);
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );

    axios
      .post("http://localhost:8080/api/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Produit ajouté avec succès:", response.data);
        alert("Produit ajouté avec succès");
        navigate("/products");
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout du produit:", error);
        alert("Erreur lors de l'ajout du produit");
      });
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Ajouter un Produit</h2>
      <form onSubmit={submitHandler} className={styles.form}>
        {/* Input Nom Produit */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>Nom du Produit</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Nom du Produit"
            onChange={handleInputChange}
            value={product.name}
            name="name"
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>

        {/* Input Marque */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>Marque</label>
          <input
            type="text"
            name="brand"
            className={styles.input}
            placeholder="Entrez la Marque"
            value={product.brand}
            onChange={handleInputChange}
          />
          {errors.brand && <p className={styles.error}>{errors.brand}</p>}
        </div>

        {/* Input Description */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>Description</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Ajouter une description du produit"
            value={product.description}
            name="description"
            onChange={handleInputChange}
          />
          {errors.description && (
            <p className={styles.error}>{errors.description}</p>
          )}
        </div>

        {/* Input Prix */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>Prix</label>
          <input
            type="number"
            className={styles.input}
            placeholder="Ex: 1000€"
            onChange={handleInputChange}
            value={product.price}
            name="price"
          />
          {errors.price && <p className={styles.error}>{errors.price}</p>}
        </div>

        {/* Input Catégorie */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>Catégorie</label>
          <select
            className={styles.input}
            value={product.category}
            onChange={handleInputChange}
            name="category"
          >
            <option value="">Sélectionner la catégorie</option>
            <option value="musical-instruments">Instruments de musique</option>
            <option value="food">Nourriture</option>
            <option value="mobile-phone">Téléphone mobile</option>
          </select>
          {errors.category && <p className={styles.error}>{errors.category}</p>}
        </div>

        {/* Input Quantité */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>Quantité en Stock</label>
          <input
            type="number"
            className={styles.input}
            placeholder="Stock restant"
            onChange={handleQuantityChange} // Appel à la fonction mise à jour
            value={product.quantity}
            name="quantity"
            min={0}
          />
          {errors.quantity && <p className={styles.error}>{errors.quantity}</p>}
        </div>

        {/* Date de Lancement */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>Date de Lancement</label>
          <input
            type="date"
            className={styles.input}
            value={product.releaseDate}
            name="releaseDate"
            onChange={handleInputChange}
          />
          {errors.releaseDate && (
            <p className={styles.error}>{errors.releaseDate}</p>
          )}
        </div>

        {/* Input Image */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>Image</label>
          <input
            className={styles.input}
            type="file"
            onChange={handleImageChange}
          />
          {errors.image && <p className={styles.error}>{errors.image}</p>}
        </div>

        {/* Case disponible */}
        {product.quantity > 0 && (
          <div className={styles.checkboxGroup}>
            <input
              className={styles.checkbox}
              type="checkbox"
              name="available"
              checked={product.available}
              onChange={(e) =>
                setProduct({ ...product, available: e.target.checked })
              }
            />
            <label className={styles.checkboxLabel}>Produit Disponible</label>
          </div>
        )}

        <div className={styles.submitGroup}>
          <button type="submit" className={styles.submitButton}>
            Soumettre
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
