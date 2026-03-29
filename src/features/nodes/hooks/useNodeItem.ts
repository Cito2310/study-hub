import { useState, useEffect, useRef } from "react";

export const useNodeItem = (selectedNodeId: string | null, nodeId: string) => {
    const isSelected = selectedNodeId === nodeId;
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isEditing) return;
        const handleClickOutside = (e: MouseEvent) => {
            if (cardRef.current && !cardRef.current.contains(e.target as globalThis.Element)) {
                (document.activeElement as HTMLElement)?.blur();
                setIsEditing(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isEditing]);

    return {
        isSelected,
        isEditing,
        setIsEditing,
        showDeleteModal,
        setShowDeleteModal,
        cardRef,
    };
};
