import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STORAGE_KEYS } from "../../shared/storageKeys";

export type TextType = "normal" | "code" | "formula" | "graph";

export interface Node {
    id: string;
    unitId: string;
    parentId: string | null;
    name: string;
    text: string;
    textType: TextType;
}

interface NodesState {
    nodes: Node[];
}

const loadFromStorage = (): Node[] => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.nodes);
        return data ? (JSON.parse(data) as Node[]) : [];
    } catch {
        return [];
    }
};

const initialState: NodesState = {
    nodes: loadFromStorage(),
};

const nodesSlice = createSlice({
    name: "nodes",
    initialState,
    reducers: {
        addNode: (state, action: PayloadAction<Node>) => {
            state.nodes.push(action.payload);
        },
        updateNode: (state, action: PayloadAction<Node>) => {
            const index = state.nodes.findIndex((n) => n.id === action.payload.id);
            if (index !== -1) state.nodes[index] = action.payload;
        },
        deleteNode: (state, action: PayloadAction<string>) => {
            const idsToDelete = collectDescendants(state.nodes, action.payload);
            state.nodes = state.nodes.filter((n) => !idsToDelete.has(n.id));
        },
    },
});

const collectDescendants = (nodes: Node[], id: string): Set<string> => {
    const ids = new Set<string>([id]);
    const queue = [id];
    while (queue.length > 0) {
        const current = queue.shift()!;
        nodes.forEach((n) => {
            if (n.parentId === current) {
                ids.add(n.id);
                queue.push(n.id);
            }
        });
    }
    return ids;
};

export const { addNode, updateNode, deleteNode } = nodesSlice.actions;
export default nodesSlice.reducer;
