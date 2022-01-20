import { Navigate, Outlet } from "react-router-dom";

function PrivateOutlet() {
  let authTokens = localStorage.getItem("authTokens")
    ? localStorage.getItem("authTokens")
    : null;
  return authTokens ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateOutlet;
