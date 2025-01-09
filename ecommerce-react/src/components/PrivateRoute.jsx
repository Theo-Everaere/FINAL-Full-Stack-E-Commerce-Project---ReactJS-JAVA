import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const PrivateRoute = ({ children }) => {
  const { user } = useUserContext();

  return user ? children : <Navigate to="/authentication" replace />;
};

export default PrivateRoute;
