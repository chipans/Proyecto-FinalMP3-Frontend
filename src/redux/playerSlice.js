// src/redux/playerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSong: null, // ✅ unificado con Reproductor.js
  reproduciendo: false,
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCancionActual: (state, action) => {
      state.currentSong = action.payload;
      state.reproduciendo = true;
    },
    play: (state) => {
      state.reproduciendo = true;
    },
    pause: (state) => {
      state.reproduciendo = false;
    },
    stop: (state) => {
      state.reproduciendo = false;
      state.currentSong = null;
    },
  },
});

// 🔹 Exportar actions
export const { setCancionActual, play, pause, stop } = playerSlice.actions;

// 🔹 Exportar reducer
export default playerSlice.reducer;
