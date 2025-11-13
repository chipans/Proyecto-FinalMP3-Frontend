// frontend/src/components/LoginForm.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Axios con withCredentials: true
import { jwtDecode } from 'jwt-decode'; // ✅ Import corregido
import Cookies from 'js-cookie'; // npm install js-cookie

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Manejar cambios de campos
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await api.post('/login', formData);

      // 🔹 Guardar token completo en localStorage
      const token = response.data.token;
      if (!token) throw new Error('Token no recibido del servidor.');
      localStorage.setItem('token', token);

      // 🔹 Guardar token en cookie llamada "session"
      Cookies.set('session', token, { expires: 1, path: '/' });

      // 🔹 Decodificar token para obtener rol
      const decoded = jwtDecode(token);
      const userRole = decoded.role || 'usuario';
      localStorage.setItem('userRole', userRole);

      // 🔹 Redirección según rol
      switch (userRole) {
        case 'admin':
          navigate('/dashboard/admin');
          break;
        case 'artista':
          navigate('/dashboard/artista');
          break;
        default:
          navigate('/dashboard/usuario');
          break;
      }
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        setMessage('Credenciales incorrectas. Inténtalo nuevamente.');
      } else {
        setMessage('Error en el servidor. Inténtalo más tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '400px',
          padding: '30px',
          borderRadius: '10px',
          backgroundColor: '#fff',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '20px',
            color: '#333',
          }}
        >
          Iniciar Sesión
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
          }}
        >
          {/* Usuario */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <label
              htmlFor="username"
              style={{
                marginBottom: '5px',
                fontWeight: 'bold',
              }}
            >
              Usuario:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Ingresa tu usuario"
              required
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '14px',
              }}
            />
          </div>

          {/* Contraseña */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <label
              htmlFor="password"
              style={{
                marginBottom: '5px',
                fontWeight: 'bold',
              }}
            >
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ingresa tu contraseña"
              required
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '14px',
              }}
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: loading ? '#95a5a6' : '#2980b9',
              color: 'white',
              fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.3s ease',
            }}
          >
            {loading ? 'Iniciando...' : 'Iniciar Sesión'}
          </button>
        </form>

        {/* Mensaje */}
        {message && (
          <p
            style={{
              color: message.toLowerCase().includes('error') ? 'red' : 'green',
              marginTop: '15px',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
