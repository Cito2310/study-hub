import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { useContents } from "./useContents";
import { useNodeTree } from "../../nodes/hooks";
import { Content } from "../contentsSlice";

export const useUnitDetailPage = () => {
    const { subjectId, unitId } = useParams<{ subjectId: string; unitId: string }>();

    const subject = useAppSelector((state) =>
        state.subjects.subjects.find((s) => s.id === subjectId)
    );
    const unit = useAppSelector((state) =>
        state.units.units.find((u) => u.id === unitId)
    );

    const contents = useContents(unitId ?? "");
    const nodeTree = useNodeTree(unitId ?? "");

    const [showCreateContentModal, setShowCreateContentModal] = useState(false);
    const [selectedContent, setSelectedContent] = useState<Content | null>(null);
    const [createContentParentId, setCreateContentParentId] = useState<string | null>(null);

    const handleOpenCreateContentModal = (parentId: string | null = null) => {
        setCreateContentParentId(parentId);
        setShowCreateContentModal(true);
    };

    const handleCloseCreateContentModal = () => {
        setShowCreateContentModal(false);
        setCreateContentParentId(null);
    };

    const handleSelectContent = (content: Content) => {
        setSelectedContent(content);
        const matchingNode = nodeTree.findNodeByName(content.name);
        if (matchingNode) nodeTree.scrollToNode(matchingNode);
    };

    return {
        subject,
        subjectId,
        unit,
        unitId,
        contents,
        nodeTree,
        showCreateContentModal,
        createContentParentId,
        handleOpenCreateContentModal,
        handleCloseCreateContentModal,
        selectedContent,
        handleSelectContent,
    };
};
