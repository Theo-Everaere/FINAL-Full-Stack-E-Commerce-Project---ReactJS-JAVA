import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import FieldInput from "../../components/fieldInput/FieldInput";
import CategorySelector from "../../components/categorySelector/CategorySelector";
import styles from "./productDetails.module.css";
import { categoryTranslations } from "../../utils/categoryTranslations";

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const imageUrl = location.state?.imageUrl;

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/products/${id}`
        );
        if (!response.ok) {
          throw new Error("Erreur lors du chargement du produit");
        }
        const data = await response.json();

        const formattedReleaseDate = new Date(
          data.releaseDate
        ).toLocaleDateString("fr-FR");

        setProduct({
          ...data,
          imageUrl,
          releaseDate: formattedReleaseDate,
          category: data.category,
        });
        setIsError(false);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, imageUrl]);

  if (isLoading) {
    return <p>Chargement des informations du produit...</p>;
  }

  if (isError || !product) {
    return <p>Une erreur est survenue lors du chargement du produit.</p>;
  }

  const translatedCategory =
    categoryTranslations[product.category] || "Non spécifiée";

  return (
    <div className={styles.productDetails}>
      <div className={styles.productContainer}>
        <div className={styles.productImageContainer}>
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className={styles.productImage}
            />
          ) : (
            <div className={styles.productNoImage}>Aucune image disponible</div>
          )}
        </div>
        <div className={styles.productInfoContainer}>
          <FieldInput label="Nom" value={product.name} disabled={true} />
          <div className="form-group">
            <label className={styles.formLabel}>Description</label>
            <textarea
              className={styles.formTextArea}
              placeholder="Ajouter une description du produit"
              value={product.description}
              name="description"
              rows="2"
            />
          </div>
          <FieldInput
            label="Prix"
            value={`${product.price} €`}
            disabled={true}
          />
          <FieldInput label="Marque" value={product.brand} disabled={true} />
          <FieldInput
            label="Catégorie"
            value={translatedCategory}
            disabled={true}
          />
          <FieldInput
            label="Date de sortie"
            value={product.releaseDate}
            disabled={true}
          />
          <FieldInput
            label="Disponible"
            value={product.available ? "Oui" : "Non"}
            disabled={true}
          />
          <FieldInput
            label="Quantité disponible"
            value={product.quantity}
            disabled={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
