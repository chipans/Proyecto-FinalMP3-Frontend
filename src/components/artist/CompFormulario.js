import React, { useState } from 'react';
import axios from 'axios';
import './CompFormulario.css';

const CompFormulario = ({ onClose, onSongAdded }) => {
  const [songData, setSongData] = useState({
    title: '',
    genre: '',
    image: null,
    description: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setSongData({
      ...songData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', songData.title);
    formData.append('genre', songData.genre);
    formData.append('description', songData.description);
    if (songData.image) formData.append('image', songData.image);
    formData.append('audio', songData.file); // ✅ corregido: debe coincidir con Laravel

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/songs', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true, // ✅ Envía cookies o token
      });

      alert('✅ Canción agregada correctamente');

      // 🔹 Actualizar la lista sin recargar la página
      if (onSongAdded) {
        onSongAdded(response.data.song); // Pasamos la nueva canción
      }

      // 🔹 Cerrar el modal
      onClose();
    } catch (err) {
      console.error('Error al guardar canción:', err.response ? err.response.data : err);
      alert('❌ Ocurrió un error al agregar la canción.');
    }
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
