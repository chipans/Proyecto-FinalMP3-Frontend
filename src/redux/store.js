// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import songsReducer from "./songsSlice";      // Lista de canciones disponibles y del usuario
import playerReducer from "./playerSlice";    // Estado del reproductor

export const store = configureStore({
  reducer: {
    songs: songsReducer,
    player: playerReducer,
  },
});
