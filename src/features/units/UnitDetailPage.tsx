import { useUnitDetailPage } from "../contents/hooks";
import { Sidebar, CreateContentModal } from "../contents/components";
import { Breadcrumb } from "../../shared/components";

export const UnitDetailPage = () => {
    const {
        subject,
        subjectId,
        unit,
        rootContents,
        getChildren,
        createContent,
        removeContent,
        canHaveChildren,
        toggle,
        showCreateModal,
        createParentId,
        handleOpenCreateModal,
        handleCloseCreateModal,
        selectedContent,
        setSelectedContent,
    } = useUnitDetailPage();

    if (!subject || !unit) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-10">
                <p className="text-sm text-gray-500">Unidad no encontrada.</p>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar
                rootContents={rootContents}
                getChildren={getChildren}
                selectedId={selectedContent?.id ?? null}
                onSelect={setSelectedContent}
                onDelete={removeContent}
                onToggle={toggle}
                onAdd={() => handleOpenCreateModal(null)}
            />

            <main className="flex-1 px-8 py-6">
                <Breadcrumb
                    items={[
                        { label: "Materias", path: "/" },
                        { label: subject.name, path: `/subjects/${subjectId}` },
                        { label: unit.name },
                    ]}
                />
            </main>

            {showCreateModal && (
                <CreateContentModal
                    onCreate={createContent}
                    onClose={handleCloseCreateModal}
                    parentId={createParentId}
                    rootContents={rootContents}
                    canHaveChildren={canHaveChildren}
                />
            )}
        </div>
    );
};
