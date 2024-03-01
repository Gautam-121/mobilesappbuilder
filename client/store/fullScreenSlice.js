import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

const fullScreenSlice = createSlice({
    name: 'fullScreenMode',
    initialState,
    reducers: {
        goFullScreen(state, action) {
            return true;
        },
        exitFullScreen(state, action) {
            return false;
        }
    }
});

export const { goFullScreen, exitFullScreen } = fullScreenSlice.actions;
export default fullScreenSlice.reducer;
