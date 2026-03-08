import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserDashboard from "./pages/UserDashboard";
import ProductPage from "./pages/ProductPage";
import WishlistPage from "./pages/WishlistPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth pages — no layout wrapper */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* All other pages wrapped in MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
