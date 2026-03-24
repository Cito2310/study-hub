import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STORAGE_KEYS } from "../../shared/storageKeys";

export interface Unit {
    id: string;
    subjectId: string;
    name: string;
}

interface UnitsState {
    units: Unit[];
}

const loadFromStorage = (): Unit[] => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.units);
        return data ? (JSON.parse(data) as Unit[]) : [];
    } catch {
        return [];
    }
};

const initialState: UnitsState = {
    units: loadFromStorage(),
};

const unitsSlice = createSlice({
    name: "units",
    initialState,
    reducers: {
        addUnit: (state, action: PayloadAction<Unit>) => {
            state.units.push(action.payload);
        },
        updateUnit: (state, action: PayloadAction<Unit>) => {
            const index = state.units.findIndex((u) => u.id === action.payload.id);
            if (index !== -1) state.units[index] = action.payload;
        },
        deleteUnit: (state, action: PayloadAction<string>) => {
            state.units = state.units.filter((u) => u.id !== action.payload);
        },
    },
});

export const { addUnit, updateUnit, deleteUnit } = unitsSlice.actions;
export default unitsSlice.reducer;
