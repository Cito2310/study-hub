import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addContent, deleteContent, toggleContent, Content } from "../contentsSlice";
import { STORAGE_KEYS } from "../../../shared/storageKeys";

const saveToStorage = (contents: Content[]) => {
    localStorage.setItem(STORAGE_KEYS.contents, JSON.stringify(contents));
};

export const useContents = (unitId: string) => {
    const dispatch = useAppDispatch();
    const allContents = useAppSelector((state) => state.contents.contents);
    const contents = allContents.filter((c) => c.unitId === unitId);

    const rootContents = contents.filter((c) => c.parentId === null);
    const getChildren = (parentId: string) => contents.filter((c) => c.parentId === parentId);

    const canHaveChildren = (parentId: string) => {
        const parent = allContents.find((c) => c.id === parentId);
        return parent?.parentId === null;
    };

    const createContent = (name: string, parentId: string | null) => {
        if (parentId && !canHaveChildren(parentId)) return;
        const content: Content = { id: crypto.randomUUID(), unitId, parentId, name, checked: false };
        dispatch(addContent(content));
        saveToStorage([...allContents, content]);
    };

    const removeContent = (id: string) => {
        dispatch(deleteContent(id));
        saveToStorage(allContents.filter((c) => c.id !== id && c.parentId !== id));
    };

    const toggle = (id: string) => {
        dispatch(toggleContent(id));
        saveToStorage(allContents.map((c) => (c.id === id ? { ...c, checked: !c.checked } : c)));
    };

    return { rootContents, getChildren, createContent, removeContent, canHaveChildren, toggle };
};
