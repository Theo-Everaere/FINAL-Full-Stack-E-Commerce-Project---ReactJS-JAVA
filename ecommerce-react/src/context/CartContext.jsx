import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const token = localStorage.getItem("token");
  const [cart, setCart] = useState([]);

  // Charger le panier au démarrage
  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(localCart);
  }, []);

  // Synchroniser le panier avec le localStorage
  const syncLocalCart = (cartItems) => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    setCart(cartItems);
  };

  // Ajouter un produit au panier
  const addToCart = (product) => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ product, quantity: 1 });
    }

    syncLocalCart(updatedCart);
  };

  // Mettre à jour la quantité d'un produit
  const updateQuantity = (productId, quantity) => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find(
      (item) => item.product.id === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
      if (existingItem.quantity <= 0) {
        // Supprimer l'élément si la quantité est <= 0
        const index = updatedCart.indexOf(existingItem);
        updatedCart.splice(index, 1);
      }
    }

    syncLocalCart(updatedCart);
  };

  // Supprimer un produit du panier
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.product.id !== productId);
    syncLocalCart(updatedCart);
  };

  const placeOrder = async () => {
    if (!user || !token) {
      alert("Veuillez vous connecter pour passer une commande.");
      return;
    }

    const orderRequest = {
      userId: user.id,
      items: cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        unitPrice: item.product.price,
      })),
      totalPrice: cart.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      ),
    };

    console.log("Token envoyé dans la requête : ", token);
    console.log("Données de la commande : ", orderRequest);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/order",
        orderRequest,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        alert("Commande passée avec succès !");
        syncLocalCart([]);
      }
    } catch (e) {
      console.error("Erreur lors de la commande :", e);
      alert("Impossible de passer la commande.");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
