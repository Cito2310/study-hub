import { Node } from "../nodesSlice";
import { NodeEditor } from "./NodeEditor";
import { DeleteNodeModal } from "./DeleteNodeModal";
import { FormulaRenderer } from "./FormulaRenderer";
import { useNodeItem } from "../hooks";

interface NodeItemProps {
    node: Node;
    children: Node[];
    getChildren: (parentId: string) => Node[];
    selectedNodeId: string | null;
    onSelect: (id: string) => void;
    onDelete: (id: string) => void;
    onAddChild: (parentId: string) => void;
    onEdit: (id: string, changes: Partial<Pick<Node, "name" | "text" | "textType">>) => void;
    depth?: number;
}

export const NodeItem = ({
    node,
    children,
    getChildren,
    selectedNodeId,
    onSelect,
    onDelete,
    onAddChild,
    onEdit,
    depth = 0,
}: NodeItemProps) => {
    const { isSelected, isEditing, setIsEditing, showDeleteModal, setShowDeleteModal, cardRef } =
        useNodeItem(selectedNodeId, node.id);

    return (
        <div id={`node-${node.id}`} className={`flex flex-col gap-2 ${depth > 0 ? "ml-6 border-l border-gray-100 pl-4" : ""}`}>
            <div
                ref={cardRef}
                className={`group flex flex-col rounded-lg p-4 border transition-colors ${
                    isSelected ? "border-gray-900 bg-gray-50" : "border-gray-200 bg-white hover:border-gray-300"
                }`}
                onClick={() => onSelect(node.id)}
            >
                {isEditing ? (
                    <NodeEditor
                        node={node}
                        onEdit={onEdit}
                        onAddChild={() => onAddChild(node.id)}
                        onDelete={() => setShowDeleteModal(true)}
                    />
                ) : (
                    <>
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-gray-900">{node.name}</h3>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={(e) => { e.stopPropagation(); onAddChild(node.id); }}
                                    className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
                                >
                                    + hijo
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
                                    className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
                                >
                                    editar
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setShowDeleteModal(true); }}
                                    className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        {node.text && (
                            node.textType === "code" ? (
                                <pre className="text-xs bg-gray-900 text-green-400 rounded p-3 overflow-x-auto whitespace-pre-wrap mt-2">
                                    {node.text}
                                </pre>
                            ) : node.textType === "formula" ? (
                                <div className="mt-2">
                                    <FormulaRenderer formula={node.text} />
                                </div>
                            ) : (
                                <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap break-words">{node.text}</p>
                            )
                        )}
                    </>
                )}
            </div>

            {showDeleteModal && (
                <DeleteNodeModal
                    nodeName={node.name}
                    onConfirm={() => { onDelete(node.id); setShowDeleteModal(false); }}
                    onClose={() => setShowDeleteModal(false)}
                />
            )}

            {children.length > 0 && (
                <div className="flex flex-col gap-2">
                    {children.map((child) => (
                        <NodeItem
                            key={child.id}
                            node={child}
                            children={getChildren(child.id)}
                            getChildren={getChildren}
                            selectedNodeId={selectedNodeId}
                            onSelect={onSelect}
                            onDelete={onDelete}
                            onAddChild={onAddChild}
                            onEdit={onEdit}
                            depth={depth + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
