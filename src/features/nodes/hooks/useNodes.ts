import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addNode, updateNode, deleteNode, Node, TextType } from "../nodesSlice";
import { STORAGE_KEYS } from "../../../shared/storageKeys";

const saveToStorage = (nodes: Node[]) => {
    localStorage.setItem(STORAGE_KEYS.nodes, JSON.stringify(nodes));
};

const collectDescendantIds = (nodes: Node[], id: string): Set<string> => {
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

export const useNodes = (unitId: string) => {
    const dispatch = useAppDispatch();
    const allNodes = useAppSelector((state) => state.nodes.nodes);
    const nodes = allNodes.filter((n) => n.unitId === unitId);

    const rootNodes = nodes.filter((n) => n.parentId === null);
    const getChildren = (parentId: string) => nodes.filter((n) => n.parentId === parentId);

    const createNode = (name: string, parentId: string | null) => {
        const node: Node = {
            id: crypto.randomUUID(),
            unitId,
            parentId,
            name,
            text: "",
            textType: "normal",
        };
        dispatch(addNode(node));
        saveToStorage([...allNodes, node]);
    };

    const editNode = (id: string, changes: Partial<Pick<Node, "name" | "text" | "textType">>) => {
        const node = allNodes.find((n) => n.id === id);
        if (!node) return;
        const updated = { ...node, ...changes };
        dispatch(updateNode(updated));
        saveToStorage(allNodes.map((n) => (n.id === id ? updated : n)));
    };

    const removeNode = (id: string) => {
        const idsToDelete = collectDescendantIds(allNodes, id);
        dispatch(deleteNode(id));
        saveToStorage(allNodes.filter((n) => !idsToDelete.has(n.id)));
    };

    const findNodeByName = (name: string) =>
        rootNodes.find((n) => n.name.toLowerCase() === name.toLowerCase()) ?? null;

    return { rootNodes, getChildren, createNode, editNode, removeNode, findNodeByName };
};
