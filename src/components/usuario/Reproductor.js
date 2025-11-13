// src/components/usuario/Reproductor.js
import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { stop } from "../../redux/playerSlice";
import "./Reproductor.css";

const Reproductor = ({ onCerrar }) => {
  const { currentSong } = useSelector((state) => state.player);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [duracion, setDuracion] = useState(0);
  const audioRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);

      // Actualizar duración cuando se cargue la canción
      const handleLoadedMetadata = () => {
        setDuracion(audioRef.current.duration);
      };

      const handleTimeUpdate = () => {
        setProgreso(audioRef.current.currentTime);
      };

      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        audioRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [currentSong]);

  if (!currentSong) return null;

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleChangeProgreso = (e) => {
    const nuevoTiempo = e.target.value;
    audioRef.current.currentTime = nuevoTiempo;
    setProgreso(nuevoTiempo);
  };

  const detener = () => {
    dispatch(stop());
    setIsPlaying(false);
    if (onCerrar) onCerrar();
  };

  // Formatear tiempo a mm:ss
  const formatTime = (time) => {
    const minutos = Math.floor(time / 60) || 0;
    const segundos = Math.floor(time % 60) || 0;
    return `${minutos}:${segundos < 10 ? "0" : ""}${segundos}`;
  };

  return (
    <div className="reproductor">
      <div className="info-cancion">
        <img src={currentSong.imagen} alt={currentSong.title} />
        <div className="detalles">
          <h4>{currentSong.title}</h4>
          <p>{currentSong.artist}</p>
        </div>
      </div>

      <div className="progreso">
        <span className="tiempo">{formatTime(progreso)}</span>
        <input
          type="range"
          min="0"
          max={duracion}
          step="0.1"
          value={progreso}
          onChange={handleChangeProgreso}
        />
        <span className="tiempo">{formatTime(duracion)}</span>
      </div>

      <div className="controles">
        <button onClick={togglePlay}>
          {isPlaying ? "⏸️ Pausar" : "▶️ Reproducir"}
        </button>
        <button onClick={detener}>⏹️ Detener</button>
        {onCerrar && (
          <button className="cerrar" onClick={onCerrar}>
            ❌ Cerrar
          </button>
        )}
      </div>

      <audio ref={audioRef} src={currentSong.audio} hidden />
    </div>
  );
};

export default Reproductor;
