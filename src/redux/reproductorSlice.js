import { createSlice } from "@reduxjs/toolkit";

const reproductorSlice = createSlice({
  name: "reproductor",
  initialState: { actual: null },
  reducers: {
    reproducir: (state, action) => {
      state.actual = action.payload;
    },
  },
});

export const { reproducir } = reproductorSlice.actions;
export default reproductorSlice.reducer;
