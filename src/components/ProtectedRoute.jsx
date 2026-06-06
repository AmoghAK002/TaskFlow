import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {

  const {
    user,
    authLoading
  } = useContext(AuthContext);

  if (authLoading) {

    return (
      <div className="text-center mt-5">
        <div className="spinner-border"></div>
      </div>
    );

  }

  if (!user) {

    return <Navigate to="/" />;

  }

  return children;

}

export default ProtectedRoute;