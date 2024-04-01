import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAnyComponentEditing: false,
};

const editStatusSlice = createSlice({
  name: "editStatus",
  initialState,
  reducers: {
    setEditingStatus(state, action) {
      state.isAnyComponentEditing = action.payload;
    },
  },
});



export const { setEditingStatus } = editStatusSlice.actions;

export default editStatusSlice.reducer;
