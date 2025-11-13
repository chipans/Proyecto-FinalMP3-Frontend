import React from 'react';
import './CompDetalle.css';

const CompDetalle = ({ song }) => {
  return (
    <div className="song-detail">
      <h3>{song.title}</h3>
      <p><strong>Género:</strong> {song.genre}</p>
      <p>{song.description}</p>
      <img src={song.image || 'https://via.placeholder.com/150'} alt={song.title} />
      <div className="song-actions">
        <button>Editar</button>
        <button>Eliminar</button>
        <button>Guardar</button>
      </div>
    </div>
  );
};

export default CompDetalle;
