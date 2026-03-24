import { useState } from "react";
import { useNodes } from "./useNodes";
import { Node } from "../nodesSlice";

export const useNodeTree = (unitId: string) => {
    const nodes = useNodes(unitId);
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [createParentId, setCreateParentId] = useState<string | null>(null);

    const handleOpenCreateModal = (parentId: string | null = null) => {
        setCreateParentId(parentId);
        setShowCreateModal(true);
    };

    const handleCloseCreateModal = () => {
        setShowCreateModal(false);
        setCreateParentId(null);
    };

    const scrollToNode = (node: Node) => {
        setSelectedNodeId(node.id);
        setTimeout(() => {
            document.getElementById(`node-${node.id}`)?.scrollIntoView({ behavior: "smooth" });
        }, 50);
    };

    return {
        ...nodes,
        selectedNodeId,
        setSelectedNodeId,
        showCreateModal,
        createParentId,
        handleOpenCreateModal,
        handleCloseCreateModal,
        scrollToNode,
    };
};
