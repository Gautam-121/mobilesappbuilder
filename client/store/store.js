import {configureStore} from '@reduxjs/toolkit';

import themeSlice from './themeSlice';
import fullScreenSlice from './fullScreenSlice';
import appDesignPageRefreshedSlice from './appDesignPageRefreshedSlice';
import draggedElementsSlice from './draggedElementsSlice';
import editStatusSlice from './editStatusSlice';

//draggedElementsSlice

const store = configureStore({
    reducer: {
        theme: themeSlice,
        fullScreenMode: fullScreenSlice,
        appDesignPageRefreshedSlice: appDesignPageRefreshedSlice,
        draggedElementsSlice: draggedElementsSlice,
        editStatus: editStatusSlice,
        
    }
});

export default store;