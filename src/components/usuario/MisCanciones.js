import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { playSong } from "../../redux/playerSlice";
import "./MisCanciones.css";

const MisCanciones = () => {
  const { misCanciones } = useSelector((state) => state.songs);
  const dispatch = useDispatch();

  const handlePlay = (song) => {
    dispatch(playSong(song));
  };

  return (
    <div className="mis-canciones">
      {misCanciones.length === 0 ? (
        <p>No tienes canciones agregadas todavía.</p>
      ) : (
        misCanciones.map((song) => (
          <div key={song.id} className="cancion-item">
            <div>
              <strong>{song.title}</strong> - {song.artist}
            </div>
            <div className="cancion-botones">
              <button onClick={() => handlePlay(song)}>▶️ Reproducir</button>
              <button>❌ Eliminar</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MisCanciones;
