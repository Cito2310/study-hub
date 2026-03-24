import { useSubjectDetailPage } from "./hooks";
import { UnitList, CreateModal, EditModal, DeleteModal } from "./components";
import { Breadcrumb } from "../../shared/components";
import { Calendar, NextExamBanner } from "../exams/components";
import { useExams } from "../exams/hooks";

export const SubjectDetailPage = () => {
    const {
        subject,
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
    } = useSubjectDetailPage();

    const { getNextExam } = useExams(subject?.id ?? "");

    if (!subject) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-10">
                <p className="text-sm text-gray-500">Materia no encontrada.</p>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen">
            {/* Spacer izquierdo para equilibrar el calendario */}
            <div className="w-72 shrink-0" />

            {/* Centro */}
            <div className="flex-1 flex justify-center px-4 py-10">
                <div className="w-full max-w-2xl">
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
                </div>
            </div>

            {/* Panel derecho — Calendario */}
            <aside className="w-72 shrink-0 border-l border-gray-200 px-5 py-10">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
                    Parciales
                </h3>
                <Calendar subjectId={subject.id} />
                <div className="mt-4">
                    <NextExamBanner exam={getNextExam()} />
                </div>
            </aside>

            {/* Modales */}
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
