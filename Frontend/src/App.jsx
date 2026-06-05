import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budgets from "./pages/Budgets";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import Register from "./pages/Register";


const isAuth = () => localStorage.getItem("token");


const Protected = ({ children }) => {
  return isAuth() ? children : <Navigate to="/login" replace />;
};


function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar setSidebarOpen={setSidebarOpen} />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* AUTH ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/reset-password/:token" element={<ResetPassword />} />


      {/* DASHBOARD (FIXED ROOT ISSUE) */}
      <Route
        path="/"
        element={
          <Protected>
            <Layout>
              <Dashboard />
            </Layout>
          </Protected>
        }
      />

      {/* OPTIONAL: explicit dashboard route (prevents white screen bugs) */}
      <Route
        path="/dashboard"
        element={
          <Protected>
            <Layout>
              <Dashboard />
            </Layout>
          </Protected>
        }
      />

      {/* OTHER PROTECTED ROUTES */}
      <Route
        path="/transactions"
        element={
          <Protected>
            <Layout>
              <Transactions />
            </Layout>
          </Protected>
        }
      />

      <Route
        path="/budgets"
        element={
          <Protected>
            <Layout>
              <Budgets />
            </Layout>
          </Protected>
        }
      />

      <Route
        path="/analytics"
        element={
          <Protected>
            <Layout>
              <Analytics />
            </Layout>
          </Protected>
        }
      />

      {/* FALLBACK ROUTE (VERY IMPORTANT) */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}