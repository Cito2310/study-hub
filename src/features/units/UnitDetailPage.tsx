import { useUnitDetailPage } from "../contents/hooks";
import { Sidebar, CreateContentModal } from "../contents/components";
import { NodeTree, CreateNodeModal } from "../nodes/components";
import { Breadcrumb } from "../../shared/components";

export const UnitDetailPage = () => {
    const {
        subject,
        subjectId,
        unit,
        contents,
        nodeTree,
        showCreateContentModal,
        createContentParentId,
        handleOpenCreateContentModal,
        handleCloseCreateContentModal,
        selectedContent,
        handleSelectContent,
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
                rootContents={contents.rootContents}
                getChildren={contents.getChildren}
                selectedId={selectedContent?.id ?? null}
                onSelect={handleSelectContent}
                onDelete={contents.removeContent}
                onToggle={contents.toggle}
                onAdd={() => handleOpenCreateContentModal(null)}
            />

            <main className="flex-1 px-8 py-6 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <Breadcrumb
                        items={[
                            { label: "Materias", path: "/" },
                            { label: subject.name, path: `/subjects/${subjectId}` },
                            { label: unit.name },
                        ]}
                    />
                    <button
                        onClick={() => nodeTree.handleOpenCreateModal(null)}
                        className="text-sm text-gray-500 hover:text-gray-900 transition-colors shrink-0"
                    >
                        + Nuevo nodo
                    </button>
                </div>

                <NodeTree
                    rootNodes={nodeTree.rootNodes}
                    getChildren={nodeTree.getChildren}
                    selectedNodeId={nodeTree.selectedNodeId}
                    onSelect={nodeTree.setSelectedNodeId}
                    onDelete={nodeTree.removeNode}
                    onAddChild={nodeTree.handleOpenCreateModal}
                    onEdit={nodeTree.editNode}
                />
            </main>

            {showCreateContentModal && (
                <CreateContentModal
                    onCreate={contents.createContent}
                    onClose={handleCloseCreateContentModal}
                    parentId={createContentParentId}
                    rootContents={contents.rootContents}
                    canHaveChildren={contents.canHaveChildren}
                />
            )}

            {nodeTree.showCreateModal && (
                <CreateNodeModal
                    onCreate={nodeTree.createNode}
                    onClose={nodeTree.handleCloseCreateModal}
                    parentId={nodeTree.createParentId}
                />
            )}
        </div>
    );
};
