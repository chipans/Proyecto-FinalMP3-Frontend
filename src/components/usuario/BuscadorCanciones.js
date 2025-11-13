import React, { useState } from "react";
import "./BuscadorCanciones.css";

const BuscadorCanciones = ({ onBuscar }) => {
  const [termino, setTermino] = useState("");

  const manejarCambio = (e) => setTermino(e.target.value);

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (termino.trim() !== "") {
      onBuscar(termino.trim());
    }
  };

  return (
    <form className="buscador-canciones" onSubmit={manejarEnvio}>
      <button type="submit">🔍 Buscar</button>
      <input
        type="text"
        placeholder="Buscar canción o artista..."
        value={termino}
        onChange={manejarCambio}
      />
    </form>
  );
};

export default BuscadorCanciones;
