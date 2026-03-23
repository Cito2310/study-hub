import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STORAGE_KEYS } from "../../shared/storageKeys";

export interface Subject {
    id: string;
    name: string;
}

interface SubjectsState {
    subjects: Subject[];
}

const loadFromStorage = (): Subject[] => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.subjects);
        return data ? (JSON.parse(data) as Subject[]) : [];
    } catch {
        return [];
    }
};

const initialState: SubjectsState = {
    subjects: loadFromStorage(),
};

const subjectsSlice = createSlice({
    name: "subjects",
    initialState,
    reducers: {
        addSubject: (state, action: PayloadAction<Subject>) => {
            state.subjects.push(action.payload);
        },
        updateSubject: (state, action: PayloadAction<Subject>) => {
            const index = state.subjects.findIndex((s) => s.id === action.payload.id);
            if (index !== -1) state.subjects[index] = action.payload;
        },
        deleteSubject: (state, action: PayloadAction<string>) => {
            state.subjects = state.subjects.filter((s) => s.id !== action.payload);
        },
    },
});

export const { addSubject, updateSubject, deleteSubject } = subjectsSlice.actions;
export default subjectsSlice.reducer;
