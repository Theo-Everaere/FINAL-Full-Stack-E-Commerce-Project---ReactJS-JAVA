import { useContext, useState } from "react";
import useProducts from "../../hooks/useProducts";
import ProductCard from "../../components/productCard/ProductCard";
import { CartContext } from "../../context/CartContext";
import Cart from "../../components/cart/Cart";
import { UserContext } from "../../context/UserContext";
import styles from "./products.module.css";
import CategorySelector from "../../components/categorySelector/CategorySelector";

const Products = () => {
  const { cart, addToCart, updateQuantity, removeFromCart, placeOrder } =
    useContext(CartContext);
  const { user } = useContext(UserContext);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { products, isLoading, isError } = useProducts(
    `http://localhost:8080/api/products${
      selectedCategory ? `?category=${selectedCategory}` : ""
    }`
  );
  const [cartIsVisible, setCartIsVisible] = useState(false);

  const handleAddToCart = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      addToCart(product);
    }
  };

  const handleSelectCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleIncreaseQuantity = (productId) => {
    updateQuantity(productId, 1);
  };

  const handleDecreaseQuantity = (productId) => {
    updateQuantity(productId, -1);
  };

  const handlePlaceOrder = (orderRequest) => {
    placeOrder(orderRequest);
  };

  const handleShowCart = () => {
    setCartIsVisible((prevState) => !prevState);
  };

  return (
    <div className={styles.productsPage}>
      <div
        className={`${styles.productsMain} ${
          cartIsVisible ? styles.shrinkMain : ""
        }`}
      >
        <h1>Nos Produits</h1>
        <div className={styles.categoryContainer}>
          <CategorySelector
            label="Catégories"
            value={selectedCategory}
            onChange={handleSelectCategory}
          />
        </div>

        {isLoading && <p>Chargement des produits...</p>}
        {isError && (
          <p>Une erreur est survenue lors du chargement des produits.</p>
        )}
        <div className={styles.productsGrid}>
          {!isLoading &&
            !isError &&
            products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                available={product.available}
                imageUrl={product.imageUrl}
                onAddToCart={handleAddToCart}
              />
            ))}
        </div>
      </div>

      <button className={styles.toggleCartButton} onClick={handleShowCart}>
        {cartIsVisible
          ? "Fermer le panier"
          : `Voir Panier (${cart.length} ${
              cart.length <= 1 ? "article" : "articles"
            })`}
      </button>

      <div
        className={`${styles.cartSide} ${cartIsVisible ? styles.showCart : ""}`}
      >
        <Cart
          cartItems={cart}
          onRemoveFromCart={removeFromCart}
          onIncreaseQuantity={handleIncreaseQuantity}
          onDecreaseQuantity={handleDecreaseQuantity}
          isAuthenticated={!!user}
          onPlaceOrder={handlePlaceOrder}
        />
      </div>
    </div>
  );
};

export default Products;
