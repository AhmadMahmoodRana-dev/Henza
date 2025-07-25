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
import AddCarouselPage from "./pages/DashboardPages/AddCarouselPage";
import AddCategoryPage from "./pages/DashboardPages/AddCategoryPage";
import ShowCarouselPage from "./pages/DashboardPages/ShowCarouselPage";
import ShowProductPage from "./pages/DashboardPages/ShowProductPage";
import ShowCategoryPage from "./pages/DashboardPages/ShowCategoryPage";
import MenuManager from "./pages/DashboardPages/MenuManager";
import MenuPage from "./pages/MenuPage";
import CollectionPage from "./pages/CollectionPage";

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
          <Route path="/menuPages/:name/:menuId" element={<MenuPage />} />
          <Route path="/collection/:name" element={<CollectionPage />} />
        </Route>
        <Route path="/dashboard" element={<DashboardRoutes />}>
          <Route index element={<h1>Dashboard Home</h1>} />
          <Route path="add-product" element={<AddProductForm/>} />
          <Route path="Product" element={<ShowProductPage/>} />
          <Route path="Themes" element={<ShowCarouselPage/>} />
          <Route path="add-theme" element={<AddCarouselPage/>} />
          <Route path="add-theme/:id" element={<AddCarouselPage/>} />
          <Route path="Collection" element={<ShowCategoryPage/>} />
          <Route path="add-collection" element={<AddCategoryPage/>} />
          <Route path="add-collection/:id" element={<AddCategoryPage/>} />
          <Route path="Menu" element={<MenuManager/>} />
        </Route>
      </Routes>
    </div>
  );
}
