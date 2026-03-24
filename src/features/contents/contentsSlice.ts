import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STORAGE_KEYS } from "../../shared/storageKeys";

export interface Content {
    id: string;
    unitId: string;
    parentId: string | null;
    name: string;
    checked: boolean;
}

interface ContentsState {
    contents: Content[];
}

const loadFromStorage = (): Content[] => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.contents);
        return data ? (JSON.parse(data) as Content[]) : [];
    } catch {
        return [];
    }
};

const initialState: ContentsState = {
    contents: loadFromStorage(),
};

const contentsSlice = createSlice({
    name: "contents",
    initialState,
    reducers: {
        addContent: (state, action: PayloadAction<Content>) => {
            state.contents.push(action.payload);
        },
        updateContent: (state, action: PayloadAction<Content>) => {
            const index = state.contents.findIndex((c) => c.id === action.payload.id);
            if (index !== -1) state.contents[index] = action.payload;
        },
        deleteContent: (state, action: PayloadAction<string>) => {
            // también elimina los hijos
            const id = action.payload;
            state.contents = state.contents.filter(
                (c) => c.id !== id && c.parentId !== id
            );
        },
        toggleContent: (state, action: PayloadAction<string>) => {
            const content = state.contents.find((c) => c.id === action.payload);
            if (content) content.checked = !content.checked;
        },
    },
});

export const { addContent, updateContent, deleteContent, toggleContent } = contentsSlice.actions;
export default contentsSlice.reducer;
