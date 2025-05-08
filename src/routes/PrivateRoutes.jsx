import { Navigate, Outlet } from "react-router-dom";
import MainLayout from "../components/MainLayout";

const PrivateRoutes = () => {
  const token = true;
  return token ? (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
