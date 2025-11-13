// frontend/src/components/RegisterForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// ✅ Configuración de la API
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  withCredentials: true, // Necesario para cookies (Sanctum o JWT en cookie)
});

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'usuario', // Valor por defecto
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔹 Maneja cambios en los campos
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage('');
    setLoading(true);

    try {
      // 1️⃣ Registrar usuario
      await api.post('/register', formData);

      // 2️⃣ Login automático
      const loginResponse = await api.post(
        '/login',
        { username: formData.username, password: formData.password },
        { withCredentials: true }
      );

      const userRole = loginResponse.data.user.role || 'usuario';

      // 3️⃣ Redirigir al dashboard según rol
      if (userRole === 'admin') {
        navigate('/dashboard/admin');
      } else if (userRole === 'artista') {
        navigate('/dashboard/artista');
      } else {
        navigate('/dashboard/usuario');
      }

    } catch (err) {
      console.error('📛 Error del backend:', err.response?.data);

      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {});
        const firstError =
          err.response.data.errors?.role?.[0] ||
          err.response.data.errors?.username?.[0] ||
          err.response.data.errors?.email?.[0] ||
          err.response.data.errors?.password?.[0] ||
          'Error en el registro. Verifica los campos.';
        setMessage(firstError);
      } else if (err.response?.status === 401) {
        setMessage('Credenciales inválidas.');
      } else {
        setMessage(
          err.response?.data?.message || 'Error en el servidor. Inténtalo más tarde.'
        );
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
          maxWidth: '420px',
          padding: '30px',
          borderRadius: '10px',
          backgroundColor: '#fff',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
          Registro de Usuario
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {/* Usuario */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="username" style={{ marginBottom: '5px', fontWeight: 'bold' }}>
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
            {errors.username && <p style={{ color: 'red', fontSize: '13px' }}>{errors.username[0]}</p>}
          </div>

          {/* Email */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="email" style={{ marginBottom: '5px', fontWeight: 'bold' }}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ingresa tu email"
              required
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '14px',
              }}
            />
            {errors.email && <p style={{ color: 'red', fontSize: '13px' }}>{errors.email[0]}</p>}
          </div>

          {/* Contraseña */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="password" style={{ marginBottom: '5px', fontWeight: 'bold' }}>
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
            {errors.password && <p style={{ color: 'red', fontSize: '13px' }}>{errors.password[0]}</p>}
          </div>

          {/* Confirmar contraseña */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="password_confirmation" style={{ marginBottom: '5px', fontWeight: 'bold' }}>
              Confirmar Contraseña:
            </label>
            <input
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              placeholder="Confirma tu contraseña"
              required
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '14px',
              }}
            />
          </div>

          {/* Rol */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="role" style={{ marginBottom: '5px', fontWeight: 'bold' }}>
              Rol:
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '14px',
              }}
            >
              <option value="usuario">Usuario</option>
              <option value="artista">Artista</option>
              <option value="admin">Administrador</option>
            </select>
            {errors.role && <p style={{ color: 'red', fontSize: '13px' }}>{errors.role[0]}</p>}
          </div>

          {/* Botón de envío */}
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
            {loading ? 'Registrando...' : 'Registrar'}
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

export default RegisterForm;
