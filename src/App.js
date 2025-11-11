// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegisterForm from './components/RegisterForm'; 
import LoginForm from './components/LoginForm'; 
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <div className="App" style={{ textAlign: 'center' }}>
        <nav style={{ padding: '10px', background: '#f0f0f0' }}>
          <Link to="/register" style={{ margin: '0 15px' }}>Registro</Link>
          <Link to="/login" style={{ margin: '0 15px' }}>Login</Link>
          <Link to="/dashboard" style={{ margin: '0 15px' }}>Dashboard</Link>
        </nav>
        
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<h1>Bienvenido a la página principal. Usa el menú para navegar.</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;