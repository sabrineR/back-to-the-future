import { Route, Routes } from "react-router-dom";

import AdminLayout from "../Layout/AdminLayout";
import Dashboard from "../views/Dashboard";
import Movies from "../views/Movies";
import Login from "../views/Login";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/movies" element={<Movies />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
