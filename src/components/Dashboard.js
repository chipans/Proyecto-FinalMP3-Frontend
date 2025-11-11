// frontend/src/components/Dashboard.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Usar api.js con interceptor que incluye token Bearer

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Petición protegida con token Bearer
        const response = await api.get('/user');
        setUserInfo(response.data);
      } catch (err) {
        console.error(err);
        setError('Acceso denegado. Por favor, inicia sesión.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          fontSize: '18px',
          color: '#333',
        }}
      >
        Cargando información del Dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          color: 'red',
          fontSize: '16px',
        }}
      >
        <p>Error: {error}</p>
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '30px',
        backgroundColor: '#f0f2f5',
      }}
    >
      <div
        style={{
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
        }}
      >
        <h2>Dashboard</h2>
        <h3>Bienvenido, {userInfo.username}</h3>
        <p>Correo: {userInfo.email}</p>
        <p>
          Esta página es accesible <strong>solo si el token Bearer es válido</strong>.
        </p>

        <button
          onClick={() => {
            localStorage.removeItem('token'); // Borra el token al cerrar sesión
            navigate('/login'); // Redirige al login
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
