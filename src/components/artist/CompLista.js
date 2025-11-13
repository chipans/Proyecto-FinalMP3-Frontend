import React from 'react';
import './CompLista.css';

const CompLista = ({ onSelectSong }) => {
  const songs = [
    { id: 1, title: 'Canción 1', genre: 'Pop', description: 'Descripcion 1', image: '', url: 'cancion1.mp3' },
    { id: 2, title: 'Canción 2', genre: 'Rock', description: 'Descripcion 2', image: '', url: 'cancion2.mp3' },
    { id: 3, title: 'Canción 3', genre: 'Jazz', description: 'Descripcion 3', image: '', url: 'cancion3.mp3' },
  ];

  return (
    <div className="song-list">
      <h2>Tus Canciones</h2>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            <span className="song-title">{song.title}</span>
            <button className="btn-play" onClick={() => onSelectSong(song)}>
              Reproducir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompLista;
