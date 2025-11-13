import { createSlice } from "@reduxjs/toolkit";

const cancionesSlice = createSlice({
  name: "canciones",
  initialState: [],
  reducers: {
    setCanciones: (state, action) => action.payload,
    agregarCancion: (state, action) => {
      state.push(action.payload);
    },
    eliminarCancion: (state, action) =>
      state.filter((c) => c.id !== action.payload),
  },
});

export const { setCanciones, agregarCancion, eliminarCancion } = cancionesSlice.actions;
export default cancionesSlice.reducer;
