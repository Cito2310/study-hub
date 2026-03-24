import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { useUnitsPage } from "./hooks";
import { UnitList, CreateModal, EditModal, DeleteModal } from "./components";
import { Breadcrumb } from "../../shared/components";

export const SubjectDetailPage = () => {
    const { subjectId } = useParams<{ subjectId: string }>();

    const subject = useAppSelector((state) =>
        state.subjects.subjects.find((s) => s.id === subjectId)
    );

    const {
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
    } = useUnitsPage(subjectId ?? "");

    if (!subject) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-10">
                <p className="text-sm text-gray-500">Materia no encontrada.</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <Breadcrumb
                items={[
                    { label: "Materias", path: "/" },
                    { label: subject.name },
                ]}
            />

            <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-medium text-gray-700">Unidades</h2>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-gray-900 text-white text-sm rounded-lg px-4 py-2 hover:bg-gray-700 transition-colors"
                >
                    Nueva unidad
                </button>
            </div>

            <UnitList
                units={units}
                onEditClick={setUnitToEdit}
                onDeleteClick={setUnitToDelete}
            />

            {showCreateModal && (
                <CreateModal
                    onCreate={createUnit}
                    onClose={() => setShowCreateModal(false)}
                />
            )}
            {unitToEdit && (
                <EditModal
                    unitName={unitToEdit.name}
                    onConfirm={handleEditModal}
                    onClose={() => setUnitToEdit(null)}
                />
            )}
            {unitToDelete && (
                <DeleteModal
                    unitName={unitToDelete.name}
                    onConfirm={handleDeleteModal}
                    onClose={() => setUnitToDelete(null)}
                />
            )}
        </div>
    );
};
