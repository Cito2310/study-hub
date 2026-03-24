import { useRef, useState } from "react";
import { Node, TextType } from "../nodesSlice";

interface UseNodeEditorProps {
    node: Node;
    onEdit: (id: string, changes: Partial<Pick<Node, "name" | "text" | "textType">>) => void;
}

export const useNodeEditor = ({ node, onEdit }: UseNodeEditorProps) => {
    const [name, setName] = useState(node.name);
    const [text, setText] = useState(node.text);
    const [textType, setTextType] = useState<TextType>(node.textType);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

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

    const insertAtCursor = (snippet: string) => {
        const el = textareaRef.current;
        if (!el) return;
        const start = el.selectionStart;
        const end = el.selectionEnd;
        const newText = text.slice(0, start) + snippet + text.slice(end);
        setText(newText);
        // restaurar cursor después del snippet
        requestAnimationFrame(() => {
            el.focus();
            const cursor = start + snippet.length;
            el.setSelectionRange(cursor, cursor);
        });
    };

    return {
        name, setName, handleNameBlur,
        text, setText, handleTextBlur,
        textType, handleTextTypeChange,
        textareaRef, insertAtCursor,
    };
};
