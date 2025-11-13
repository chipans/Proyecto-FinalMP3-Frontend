import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CompFormulario from './CompFormulario';
import CompLista from './CompLista';
import CompDetalle from './CompDetalle';
import CompReproductor from './CompReproductor';
import './ArtistDashboard.css';

const ArtistDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [songs, setSongs] = useState([]); // 🔹 Lista de canciones

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSelectSong = (song) => setSelectedSong(song);

  // 🔹 Traer canciones del artista al cargar el dashboard
  const fetchSongs = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/songs/mine', { withCredentials: true });
      setSongs(res.data);
    } catch (err) {
      console.error('Error al obtener canciones:', err);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  // 🔹 Función que se pasa a CompFormulario para refrescar lista
  const handleSongAdded = () => {
    handleCloseModal();
    fetchSongs();
  };

  return (
    <div className="artist-dashboard">
      {/* 🔹 Section con color de login/registro */}
      <section className="dashboard-header">
        <h1>Bienvenido, Artista 🎵</h1>
        <button className="btn-add-song" onClick={handleOpenModal}>
          Agregar Canción
        </button>
      </section>

      {/* 🔹 Cuerpo blanco */}
      <div className="dashboard-body">
        <div className="left-panel">
          <CompLista songs={songs} onSelectSong={handleSelectSong} />
        </div>

        <div className="right-panel">
          {selectedSong ? (
            <>
              <CompDetalle song={selectedSong} />
              <CompReproductor song={selectedSong} />
            </>
          ) : (
            <p>Selecciona una canción para ver detalles y reproducir</p>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={handleCloseModal}>✖</button>
            {/* 🔹 Pasamos handleSongAdded para actualizar lista */}
            <CompFormulario 
              onClose={handleCloseModal} 
              onSongAdded={(newSong) => {
                window.dispatchEvent(new CustomEvent('songAdded', { detail: newSong }));
             }}
             />
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistDashboard;
