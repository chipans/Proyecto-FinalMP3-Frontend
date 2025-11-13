// src/redux/songsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  disponibles: [],
  misCanciones: [],
};

export const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    setCancionesDisponibles: (state, action) => {
      state.disponibles = action.payload;
    },
    agregarCancion: (state, action) => {
      if (!state.misCanciones.find(c => c.id === action.payload.id)) {
        state.misCanciones.push(action.payload);
      }
    },
    eliminarCancion: (state, action) => {
      state.misCanciones = state.misCanciones.filter(c => c.id !== action.payload);
    },
  },
});

export const { setCancionesDisponibles, agregarCancion, eliminarCancion } = songsSlice.actions;
export default songsSlice.reducer;
