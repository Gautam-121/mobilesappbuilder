import {createSlice} from '@reduxjs/toolkit';


const initialState = [];

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers:{
        selectTheme(state, action){
                state.push(action.payload);
        }
    }
});

export const {selectTheme} = themeSlice.actions;
export default themeSlice.reducer;