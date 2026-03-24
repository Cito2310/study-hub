import { configureStore } from "@reduxjs/toolkit";
import subjectsReducer from "../features/subjects/subjectsSlice";
import unitsReducer from "../features/units/unitsSlice";

export const store = configureStore({
    reducer: {
        subjects: subjectsReducer,
        units: unitsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
