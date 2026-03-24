import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { useContents } from "./useContents";
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

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedContent, setSelectedContent] = useState<Content | null>(null);
    const [createParentId, setCreateParentId] = useState<string | null>(null);

    const handleOpenCreateModal = (parentId: string | null = null) => {
        setCreateParentId(parentId);
        setShowCreateModal(true);
    };

    const handleCloseCreateModal = () => {
        setShowCreateModal(false);
        setCreateParentId(null);
    };

    return {
        subject,
        subjectId,
        unit,
        unitId,
        ...contents,
        toggle: contents.toggle,
        showCreateModal,
        createParentId,
        handleOpenCreateModal,
        handleCloseCreateModal,
        selectedContent,
        setSelectedContent,
    };
};
