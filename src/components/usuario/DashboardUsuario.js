// src/components/usuario/DashboardUsuario.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCancionActual, stop } from "../../redux/playerSlice";
import BuscadorCanciones from "./BuscadorCanciones";
import ListaCanciones from "./ListaCanciones";
import Reproductor from "./Reproductor";
import "./DashboardUsuario.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const DashboardUsuario = () => {
  const dispatch = useDispatch();
  const currentSong = useSelector((state) => state.player.cancionActual);
  const reproduciendo = useSelector((state) => state.player.reproduciendo);

  const [canciones, setCanciones] = useState([]);
  const [misCanciones, setMisCanciones] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 🔹 Simulación de canciones (puedes reemplazar por tu API)
    setCanciones([
      {
        id: 1,
        titulo: "Shape of You",
        artista: "Ed Sheeran",
        imagen: "/img1.jpg",
        audio: "/song1.mp3",
      },
      {
        id: 2,
        titulo: "Blinding Lights",
        artista: "The Weeknd",
        imagen: "/img2.jpg",
        audio: "/song2.mp3",
      },
    ]);
  }, []);

  // 🔹 Manejar la búsqueda de canciones o artistas
  const manejarBusqueda = (termino) => {
    console.log("Buscando:", termino);
    // Aquí podrías filtrar canciones o buscar en tu backend
  };

  // 🔹 Agregar canción a "Mis canciones"
  const agregarCancion = (cancion) => {
    if (!misCanciones.some((c) => c.id === cancion.id)) {
      setMisCanciones([...misCanciones, cancion]);
    }
  };

  // 🔹 Eliminar canción de "Mis canciones"
  const eliminarCancion = (id) => {
    setMisCanciones(misCanciones.filter((c) => c.id !== id));
    if (currentSong && currentSong.id === id) {
      dispatch(stop());
    }
  };

  // 🔹 Reproducir canción usando Redux
  const reproducirCancion = (cancion) => {
    dispatch(setCancionActual(cancion));
  };

  // 🔹 Cerrar sesión
  const cerrarSesion = () => {
    Cookies.remove("session");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <div className="dashboard-usuario">
      {/* 🔹 Encabezado con botón de cerrar sesión */}
      <div className="dashboard-header">
        <h2>🎵 Dashboard del Usuario</h2>
        <button className="btn-cerrar-sesion" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </div>

      <BuscadorCanciones onBuscar={manejarBusqueda} />

      <section>
        <h3>Canciones disponibles</h3>
        <ListaCanciones
          canciones={canciones}
          onAgregar={agregarCancion}
          onReproducir={reproducirCancion}
        />
      </section>

      <section>
        <h3>Mis canciones</h3>
        <ListaCanciones
          canciones={misCanciones}
          onEliminar={eliminarCancion}
          onReproducir={reproducirCancion}
        />
      </section>

      {/* 🔹 Mostrar reproductor si hay canción actual */}
      {currentSong && (
        <div className="reproductor-container">
          <Reproductor />
        </div>
      )}
    </div>
  );
};

export default DashboardUsuario;
