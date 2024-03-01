import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

const appDesignPageRefreshedSlice = createSlice({

    name: 'appDesignPageRefreshedSlice',
    initialState,
    reducers: {
        pageRefreshed(state, action) {
            return true;
        },
        pageNotRefreshed(state, action) {
            return false;
        },
        
    }
});

export const { pageRefreshed, pageNotRefreshed } = appDesignPageRefreshedSlice.actions;
export default appDesignPageRefreshedSlice.reducer;
