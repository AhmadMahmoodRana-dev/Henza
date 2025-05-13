import { Navigate, Outlet } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
const DashboardRoutes = () => {
  const token = true; // Replace with real auth logic
  return token ? (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ) : (
    <Navigate to="/login" />
  );
};

export default DashboardRoutes;
