import { Navigate, Outlet } from "react-router-dom";

function PrivateOutlet() {
  let access_token = localStorage.getItem("access_token");
  return access_token ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateOutlet;
