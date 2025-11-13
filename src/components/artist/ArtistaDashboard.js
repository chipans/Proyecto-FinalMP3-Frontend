import React, { useState } from 'react';
import CompFormulario from './CompFormulario';
import CompLista from './CompLista';
import CompDetalle from './CompDetalle';
import CompReproductor from './CompReproductor';
import './ArtistDashboard.css';

const ArtistDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSelectSong = (song) => {
    setSelectedSong(song);
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
          <CompLista onSelectSong={handleSelectSong} />
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
            <CompFormulario onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistDashboard;
