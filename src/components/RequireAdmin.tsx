import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectCurrentAdminToken } from "../services/adminReducer";

const RequireAdmin = () => {
  const token = useSelector(selectCurrentAdminToken);

  console.log(token)
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} state={{ from: location }} replace />
  );
};

export default RequireAdmin;
