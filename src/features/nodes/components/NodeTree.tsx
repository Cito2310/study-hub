import { Node } from "../nodesSlice";
import { NodeItem } from "./NodeItem";

interface NodeTreeProps {
    rootNodes: Node[];
    getChildren: (parentId: string) => Node[];
    selectedNodeId: string | null;
    onSelect: (id: string) => void;
    onDelete: (id: string) => void;
    onAddChild: (parentId: string) => void;
    onEdit: (id: string, changes: Partial<Pick<Node, "name" | "text" | "textType">>) => void;
}

export const NodeTree = ({
    rootNodes,
    getChildren,
    selectedNodeId,
    onSelect,
    onDelete,
    onAddChild,
    onEdit,
}: NodeTreeProps) => {
    if (rootNodes.length === 0) {
        return (
            <p className="text-sm text-gray-400 text-center py-10">
                Sin nodos aún. Crea el primero con "+ Nuevo nodo".
            </p>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {rootNodes.map((node) => (
                <NodeItem
                    key={node.id}
                    node={node}
                    children={getChildren(node.id)}
                    getChildren={getChildren}
                    selectedNodeId={selectedNodeId}
                    onSelect={onSelect}
                    onDelete={onDelete}
                    onAddChild={onAddChild}
                    onEdit={onEdit}
                />
            ))}
        </div>
    );
};
