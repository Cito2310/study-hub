import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addUnit, updateUnit, deleteUnit, Unit } from "../unitsSlice";
import { STORAGE_KEYS } from "../../../shared/storageKeys";

const saveToStorage = (units: Unit[]) => {
    localStorage.setItem(STORAGE_KEYS.units, JSON.stringify(units));
};

export const useUnits = (subjectId: string) => {
    const dispatch = useAppDispatch();
    const allUnits = useAppSelector((state) => state.units.units);
    const units = allUnits.filter((u) => u.subjectId === subjectId);

    const createUnit = (name: string) => {
        const unit: Unit = { id: crypto.randomUUID(), subjectId, name };
        dispatch(addUnit(unit));
        saveToStorage([...allUnits, unit]);
    };

    const renameUnit = (id: string, name: string) => {
        dispatch(updateUnit({ id, subjectId, name }));
        saveToStorage(allUnits.map((u) => (u.id === id ? { ...u, name } : u)));
    };

    const removeUnit = (id: string) => {
        dispatch(deleteUnit(id));
        saveToStorage(allUnits.filter((u) => u.id !== id));
    };

    return { units, createUnit, renameUnit, removeUnit };
};
