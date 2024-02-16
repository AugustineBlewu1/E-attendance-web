import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectCurrentStudentToken } from "../services/studentReducer";

const RequireAuthStudent = () => {
  const token = useSelector(selectCurrentStudentToken);
  const location = useLocation();
console.log(token)
  return token ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} state={{ from: location }} replace />
  );
};

export default RequireAuthStudent;
