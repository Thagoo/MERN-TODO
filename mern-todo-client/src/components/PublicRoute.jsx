import { Navigate } from "react-router-dom";

const PublicRoute = ({ authenticated, children }) => {
  return <>{authenticated ? <Navigate to="/" replace /> : children}</>;
};

export default PublicRoute;
