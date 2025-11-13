import React from 'react';
import './CompReproductor.css';

const CompReproductor = ({ song }) => {
  return (
    <div className="reproductor">
      <h4>Reproduciendo: {song.title}</h4>
      <audio controls src={song.url || ''}></audio>
      <div className="player-controls">
        <button>⏮</button>
        <button>⏯</button>
        <button>⏭</button>
      </div>
    </div>
  );
};

export default CompReproductor;
