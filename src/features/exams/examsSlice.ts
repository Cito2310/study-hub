import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STORAGE_KEYS } from "../../shared/storageKeys";

export interface Exam {
    id: string;
    subjectId: string;
    date: string;
    name: string;
}

interface ExamsState {
    exams: Exam[];
}

const loadFromStorage = (): Exam[] => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.exams);
        return data ? (JSON.parse(data) as Exam[]) : [];
    } catch {
        return [];
    }
};

const initialState: ExamsState = {
    exams: loadFromStorage(),
};

const examsSlice = createSlice({
    name: "exams",
    initialState,
    reducers: {
        addExam: (state, action: PayloadAction<Exam>) => {
            state.exams.push(action.payload);
        },
        deleteExam: (state, action: PayloadAction<string>) => {
            state.exams = state.exams.filter((e) => e.id !== action.payload);
        },
    },
});

export const { addExam, deleteExam } = examsSlice.actions;
export default examsSlice.reducer;
