import { useState } from "react";
import { useSubjects } from ".";
import { Subject } from "../subjectsSlice";

export const useSubjectsPage = () => {
    const { subjects, createSubject, renameSubject, removeSubject } = useSubjects();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [subjectToDelete, setSubjectToDelete] = useState<Subject | null>(null);
    const [subjectToEdit, setSubjectToEdit] = useState<Subject | null>(null);

    const handleDeleteModal = () => {
        if (subjectToDelete) {
            removeSubject(subjectToDelete.id);
            setSubjectToDelete(null);
        }
    };

    const handleEditModal = (name: string) => {
        if (subjectToEdit) {
            renameSubject(subjectToEdit.id, name);
            setSubjectToEdit(null);
        }
    };

    return {
        subjects,
        createSubject,
        showCreateModal,
        setShowCreateModal,
        subjectToDelete,
        setSubjectToDelete,
        handleDeleteModal,
        subjectToEdit,
        setSubjectToEdit,
        handleEditModal,
    };
};
