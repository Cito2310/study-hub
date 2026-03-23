import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addSubject, updateSubject, deleteSubject, Subject } from "../subjectsSlice";
import { STORAGE_KEYS } from "../../../shared/storageKeys";

const saveToStorage = (subjects: Subject[]) => {
    localStorage.setItem(STORAGE_KEYS.subjects, JSON.stringify(subjects));
};

export const useSubjects = () => {
    const dispatch = useAppDispatch();
    const subjects = useAppSelector((state) => state.subjects.subjects);

    const createSubject = (name: string) => {
        const subject: Subject = { id: crypto.randomUUID(), name };
        dispatch(addSubject(subject));
        saveToStorage([...subjects, subject]);
    };

    const renameSubject = (id: string, name: string) => {
        dispatch(updateSubject({ id, name }));
        saveToStorage(subjects.map((s) => (s.id === id ? { ...s, name } : s)));
    };

    const removeSubject = (id: string) => {
        dispatch(deleteSubject(id));
        saveToStorage(subjects.filter((s) => s.id !== id));
    };

    return { subjects, createSubject, renameSubject, removeSubject };
};
