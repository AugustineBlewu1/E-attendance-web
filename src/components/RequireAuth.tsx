import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectCurrentToken } from "../services/userReducer";

const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  return true ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} state={{ from: location }} replace />
  );
};

export default RequireAuth;
