import React, { useState } from 'react';
import './CompFormulario.css';

const CompFormulario = ({ onClose }) => {
  const [songData, setSongData] = useState({
    title: '',
    genre: '',
    image: null,
    description: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setSongData({ ...songData, [name]: files[0] });
    } else {
      setSongData({ ...songData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Canción agregada:', songData);
    // Aquí va la lógica para enviar al backend
    onClose();
  };

  return (
    <form className="form-song" onSubmit={handleSubmit}>
      <h2>Agregar Canción</h2>

      <label>Título:</label>
      <input type="text" name="title" value={songData.title} onChange={handleChange} required />

      <label>Género:</label>
      <input type="text" name="genre" value={songData.genre} onChange={handleChange} required />

      <label>Imagen:</label>
      <input type="file" name="image" onChange={handleChange} accept="image/*" />

      <label>Descripción:</label>
      <textarea name="description" value={songData.description} onChange={handleChange}></textarea>

      <label>Archivo de canción:</label>
      <input type="file" name="file" onChange={handleChange} accept="audio/*" required />

      <button type="submit">Guardar Canción</button>
    </form>
  );
};

export default CompFormulario;
  