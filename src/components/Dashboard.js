// frontend/src/components/Dashboard.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Axios con withCredentials: true

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [dashboardMessage, setDashboardMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // 🔹 Obtener info del usuario autenticado desde la cookie session
        const userRes = await api.get('/user');
        const user = userRes.data.user;
        setUserInfo(user);

        // 🔹 Determinar endpoint de dashboard según rol
        let dashboardEndpoint = '';
        switch (user.role) {
          case 'admin':
            dashboardEndpoint = '/dashboard/admin';
            break;
          case 'artista':
            dashboardEndpoint = '/dashboard/artista';
            break;
          default:
            dashboardEndpoint = '/dashboard/usuario';
            break;
        }

        // 🔹 Obtener mensaje del dashboard correspondiente
        const dashRes = await api.get(dashboardEndpoint);
        setDashboardMessage(dashRes.data.message);
      } catch (err) {
        console.error(err);
        setError('Acceso denegado. Por favor, inicia sesión.');
        // Redirigir automáticamente al login después de 2s
        setTimeout(() => navigate('/login'), 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '18px',
        color: '#333',
      }}>
        Cargando información del Dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        color: 'red',
        fontSize: '16px',
      }}>
        <p>{error}</p>
        <button
          onClick={() => navigate('/login')}
          style={{
            marginTop: '15px',
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#2980b9',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Ir a iniciar sesión
        </button>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '30px',
      backgroundColor: '#f0f2f5',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '500px',
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        alignItems: 'center',
      }}>
        <h2>Dashboard</h2>
        <h3>{dashboardMessage}</h3>

        {userInfo && (
          <>
            <p>Usuario: {userInfo.username}</p>
            <p>Correo: {userInfo.email}</p>
            <p>Rol: {userInfo.role}</p>
          </>
        )}

        <p>
          Esta página es accesible <strong>solo si la cookie session es válida</strong>.
        </p>

        <button
          onClick={async () => {
            try {
              await api.post('/logout'); // Backend elimina la cookie session
              localStorage.removeItem('userRole'); // Limpiar rol almacenado
            } catch (err) {
              console.error(err);
            } finally {
              navigate('/login'); // Redirige al login
            }
          }}
          style={{
            backgroundColor: '#c0392b',
            color: 'white',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            marginTop: '10px',
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
