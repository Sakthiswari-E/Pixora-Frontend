import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import ProtectedRoute from "../components/ProtectedRoute";
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";
import Checkout from "../pages/Checkout";
import Home from "../pages/Home";
import Gifts from "../pages/Gifts";
import VideoEditing from "../pages/VideoEditing";
import GraphicDesign from "../pages/GraphicDesign";
import PhotoEditing from "../pages/PhotoEditing";
import EditProfile from "../pages/EditProfile";
import ChangePassword from "../pages/ChangePassword";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/" element={<Home />} />
      <Route path="/gifts" element={<Gifts />} />
      <Route path="/video-editing" element={<VideoEditing />} />
      <Route path="/graphic-design" element={<GraphicDesign />} />
      <Route path="/photo-editing" element={<PhotoEditing />} />
      <Route path="/edit-profile" element={<EditProfile /> } />
      <Route path="/change-password" element={<ChangePassword />} />
    </Routes>
  );
}

export default AppRoutes;