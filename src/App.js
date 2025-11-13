// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'; // ✅ Importación correcta

import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import AdminDashboard from './components/AdminDashboard';
import ArtistaDashboard from './components/ArtistaDashboard';
import UsuarioDashboard from './components/UsuarioDashboard';

function App() {
  // 🔹 Obtener el rol del usuario desde cookie o localStorage
  const getUserRole = () => {
    try {
      let token = Cookies.get('session');
      if (!token) token = localStorage.getItem('token');
      if (!token) return null;

      const decoded = jwtDecode(token); // ✅ decodificación segura
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
    <Router>
      <div
        className="App"
        style={{
          textAlign: 'center',
          minHeight: '100vh',
          backgroundColor: '#f7f9fb',
        }}
      >
        {/* 🔹 Navbar */}
        <nav
          style={{
            padding: '15px',
            background: '#2c3e50',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
          }}
        >
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Inicio</Link>
          <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Registro</Link>
          <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
          <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
        </nav>

        {/* 🔹 Rutas */}
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
          <Route
            path="/dashboard/usuario"
            element={
              <ProtectedRoute allowedRoles={['usuario']}>
                <UsuarioDashboard />
              </ProtectedRoute>
            }
          />

          {/* Ruta por defecto */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
