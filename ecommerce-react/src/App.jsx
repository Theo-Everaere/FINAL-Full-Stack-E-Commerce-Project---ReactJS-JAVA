import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import ProductDetails from "./pages/productDetails/ProductDetails";
import AddProduct from "./pages/addProduct/AddProduct";
import EditProduct from "./pages/editProduct/EditProduct";
import AuthPage from "./pages/auth/AuthPage";
import UserProfile from "./components/userProfile/UserProfile";
import UserProvider from "./context/UserContext";
import CartProvider from "./context/CartContext";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <UserProvider>
        <CartProvider>
          <Router>
            <Header />
            <div className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/authentication" element={<AuthPage />} />

                <Route
                  path="/products/add"
                  element={
                    <PrivateRoute>
                      <AddProduct />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/edit-product/:productId"
                  element={
                    <PrivateRoute>
                      <EditProduct />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/user-profile"
                  element={
                    <PrivateRoute>
                      <UserProfile />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </div>
            <Footer />
          </Router>
        </CartProvider>
      </UserProvider>
    </div>
  );
};

export default App;
