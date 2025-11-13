// src/components/usuario/ListaCanciones.js
import React from "react";
import "./ListaCanciones.css";

const ListaCanciones = ({ canciones, onAgregar, onEliminar, onReproducir }) => {
  if (!canciones || canciones.length === 0) {
    return <p className="sin-canciones">No hay canciones disponibles.</p>;
  }

  return (
    <div className="lista-canciones">
      {canciones.map((cancion) => (
        <div key={cancion.id} className="cancion-card">
          {/* Imagen de la canción */}
          <img
            src={cancion.imagen}
            alt={cancion.titulo}
            className="imagen-cancion"
          />

          {/* Información de la canción */}
          <div className="info-cancion">
            <h4 className="titulo-cancion">{cancion.titulo}</h4>
            <p className="artista-cancion">{cancion.artista}</p>
          </div>

          {/* Acciones: reproducir, agregar, eliminar */}
          <div className="acciones-cancion">
            {onReproducir && (
              <button
                className="btn-reproducir"
                onClick={() => onReproducir(cancion)}
              >
                ▶️ Reproducir
              </button>
            )}

            {onAgregar && (
              <button
                className="btn-agregar"
                onClick={() => onAgregar(cancion)}
              >
                ➕ Añadir
              </button>
            )}

            {onEliminar && (
              <button
                className="btn-eliminar"
                onClick={() => onEliminar(cancion.id)}
              >
                ❌ Eliminar
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListaCanciones;
