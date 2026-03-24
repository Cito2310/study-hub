import { configureStore } from "@reduxjs/toolkit";
import subjectsReducer from "../features/subjects/subjectsSlice";
import unitsReducer from "../features/units/unitsSlice";
import contentsReducer from "../features/contents/contentsSlice";
import nodesReducer from "../features/nodes/nodesSlice";

export const store = configureStore({
    reducer: {
        subjects: subjectsReducer,
        units: unitsReducer,
        contents: contentsReducer,
        nodes: nodesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
