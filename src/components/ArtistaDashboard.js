import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  withCredentials: true,
});

const ArtistaDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = async () => {
    try {
      await api.post('/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userRole');
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Panel del Artista 🎤</h1>
      <p>Hola, <strong>{user?.username}</strong></p>
      <p>Rol: <strong>Artista</strong></p>

      <div style={styles.card}>
        <h3>Sube tus canciones</h3>
        <p>Aquí podrás gestionar tus canciones, ver estadísticas y editar tu perfil.</p>
      </div>

      <button style={styles.logoutBtn} onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '40px',
    backgroundColor: '#f5f6fa',
    minHeight: '100vh',
  },
  card: {
    backgroundColor: '#fff',
    padding: '25px',
    margin: '20px auto',
    width: '80%',
    maxWidth: '600px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  logoutBtn: {
    marginTop: '30px',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#e67e22',
    color: 'white',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default ArtistaDashboard;
