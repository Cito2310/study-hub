import { useState } from "react";
import { Node, TextType } from "../nodesSlice";

interface UseNodeEditorProps {
    node: Node;
    onEdit: (id: string, changes: Partial<Pick<Node, "name" | "text" | "textType">>) => void;
}

export const useNodeEditor = ({ node, onEdit }: UseNodeEditorProps) => {
    const [name, setName] = useState(node.name);
    const [text, setText] = useState(node.text);
    const [textType, setTextType] = useState<TextType>(node.textType);

    const handleNameBlur = () => {
        const trimmed = name.trim();
        if (trimmed && trimmed !== node.name) onEdit(node.id, { name: trimmed });
        if (!trimmed) setName(node.name);
    };

    const handleTextBlur = () => {
        if (text !== node.text) onEdit(node.id, { text });
    };

    const handleTextTypeChange = (type: TextType) => {
        setTextType(type);
        onEdit(node.id, { textType: type });
    };

    return {
        name, setName, handleNameBlur,
        text, setText, handleTextBlur,
        textType, handleTextTypeChange,
    };
};
