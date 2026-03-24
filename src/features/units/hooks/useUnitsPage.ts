import { useState } from "react";
import { useUnits } from "./useUnits";
import { Unit } from "../unitsSlice";

export const useUnitsPage = (subjectId: string) => {
    const { units, createUnit, renameUnit, removeUnit } = useUnits(subjectId);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [unitToDelete, setUnitToDelete] = useState<Unit | null>(null);
    const [unitToEdit, setUnitToEdit] = useState<Unit | null>(null);

    const handleDeleteModal = () => {
        if (unitToDelete) {
            removeUnit(unitToDelete.id);
            setUnitToDelete(null);
        }
    };

    const handleEditModal = (name: string) => {
        if (unitToEdit) {
            renameUnit(unitToEdit.id, name);
            setUnitToEdit(null);
        }
    };

    return {
        units,
        createUnit,
        showCreateModal,
        setShowCreateModal,
        unitToDelete,
        setUnitToDelete,
        handleDeleteModal,
        unitToEdit,
        setUnitToEdit,
        handleEditModal,
    };
};
