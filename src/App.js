// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { Provider } from "react-redux";
import { store } from "./redux/store";

// 🔹 Dashboards
import AdminDashboard from './components/AdminDashboard';
import ArtistaDashboard from './components/artist/ArtistaDashboard';
import DashboardUsuario from "./components/usuario/DashboardUsuario"; // ✅ NUEVO DASHBOARD FRONTEND

// 🔹 Formularios y Navbar
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';

function App() {

  // 🔹 Obtener el rol del usuario desde cookie o localStorage
  const getUserRole = () => {
    try {
      let token = Cookies.get('session');
      if (!token) token = localStorage.getItem('token');
      if (!token) return null;

      const decoded = jwtDecode(token);
      return decoded.role || 'usuario';
    } catch (err) {
      console.error('Token inválido o expirado:', err);
      Cookies.remove('session');
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      return null;
    }
  };

  // 🔹 Proteger rutas según rol permitido
  const ProtectedRoute = ({ children, allowedRoles }) => {
    const role = getUserRole();
    if (!role) return <Navigate to="/login" replace />;
    if (!allowedRoles.includes(role)) return <Navigate to="/" replace />;
    return children;
  };

  // 🔹 Redirigir automáticamente según rol
  const RedirectDashboard = () => {
    const role = getUserRole();
    if (!role) return <Navigate to="/login" replace />;

    switch (role) {
      case 'admin':
        return <Navigate to="/dashboard/admin" replace />;
      case 'artista':
        return <Navigate to="/dashboard/artista" replace />;
      default:
        return <Navigate to="/dashboard/usuario" replace />;
    }
  };

  return (
    <Provider store={store}>
      <Router>
        <div
          className="App"
          style={{
            textAlign: 'center',
            minHeight: '100vh',
            backgroundColor: '#f7f9fb',
          }}
        >
          {/* 🔹 Navbar global */}
          <Navbar />

          {/* 🔹 Rutas principales */}
          <Routes>
            {/* Página de inicio */}
            <Route
              path="/"
              element={
                <h1 style={{ marginTop: '50px' }}>
                  Bienvenido a la plataforma de música 🎵
                </h1>
              }
            />

            {/* Registro y login */}
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />

            {/* Dashboard genérico */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin', 'artista', 'usuario']}>
                  <RedirectDashboard />
                </ProtectedRoute>
              }
            />

            {/* Dashboards específicos */}
            <Route
              path="/dashboard/admin"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard/artista"
              element={
                <ProtectedRoute allowedRoles={['artista']}>
                  <ArtistaDashboard />
                </ProtectedRoute>
              }
            />

            {/* ✅ Nuevo dashboard de usuario actualizado */}
            <Route
              path="/dashboard/usuario"
              element={
                <ProtectedRoute allowedRoles={['usuario']}>
                  <DashboardUsuario />
                </ProtectedRoute>
              }
            />

            {/* Ruta por defecto */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
