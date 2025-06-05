import { Navigate, Outlet } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
const DashboardRoutes = () => {
  const token = localStorage.getItem('authToken');
  return token ? (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ) : (
    <Navigate to="/login" />
  );
};

export default DashboardRoutes;
