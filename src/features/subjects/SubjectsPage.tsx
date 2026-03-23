import { useSubjectsPage } from "./hooks/useSubjectsPage";
import { SubjectList } from "./components/SubjectList";
import { CreateModal } from "./components/CreateModal";
import { DeleteModal } from "./components/DeleteModal";
import { EditModal } from "./components/EditModal";

export const SubjectsPage = () => {
    const {
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
    } = useSubjectsPage();

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Materias</h1>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-gray-900 text-white text-sm rounded-lg px-4 py-2 hover:bg-gray-700 transition-colors"
                >
                    Nueva materia
                </button>
            </div>

            {/* BODY */}
            <SubjectList
                subjects={subjects}
                onEditClick={setSubjectToEdit}
                onDeleteClick={setSubjectToDelete}
            />

            {/* MODALS */}
            {showCreateModal && (
                <CreateModal
                    onCreate={createSubject}
                    onClose={() => setShowCreateModal(false)}
                />
            )}
            {subjectToEdit && (
                <EditModal
                    subjectName={subjectToEdit.name}
                    onConfirm={handleEditModal}
                    onClose={() => setSubjectToEdit(null)}
                />
            )}
            {subjectToDelete && (
                <DeleteModal
                    subjectName={subjectToDelete.name}
                    onConfirm={handleDeleteModal}
                    onClose={() => setSubjectToDelete(null)}
                />
            )}
        </div>
    );
};
