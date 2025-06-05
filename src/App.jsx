import { Route, Routes } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import Home from "./pages/Home";
import CustomerPolicy from "./pages/CustomerPolicy";
import ContactUs from "./pages/ContactUs";
import CheckoutForm from "./pages/CheckoutForm";
import CategoryPage from "./pages/CategoryPage";
import ProductDetail from "./pages/ProductDetail";
import ScrollToHash from "./components/ScrollToHash";
import DashboardRoutes from "./routes/DashboardRoutes";
import AddProductForm from "./pages/DashboardPages/AddProductForm";
import Login from "./pages/Login";

export default function App() {
  return (
    <div>
      <ScrollToHash />
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/customer-policy" element={<CustomerPolicy />} />
          <Route path="/contactUS" element={<ContactUs />} />
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="/productDetail/:id" element={<ProductDetail />} />
          <Route path="/category/:name" element={<CategoryPage />} />
        </Route>
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardRoutes />}>
          <Route index element={<h1>Dashboard Home</h1>} />
          <Route path="create-product" element={<AddProductForm/>} />
        </Route>
      </Routes>
    </div>
  );
}
