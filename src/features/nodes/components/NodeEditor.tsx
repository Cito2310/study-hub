import { Node, TextType } from "../nodesSlice";
import { useNodeEditor } from "../hooks";
import { FormulaToolbar } from "./FormulaToolbar";
import { FormulaRenderer } from "./FormulaRenderer";

interface NodeEditorProps {
    node: Node;
    onEdit: (id: string, changes: Partial<Pick<Node, "name" | "text" | "textType">>) => void;
    onAddChild: () => void;
    onDelete: () => void;
}

export const NodeEditor = ({ node, onEdit, onAddChild, onDelete }: NodeEditorProps) => {
    const {
        name, setName, handleNameBlur,
        text, setText, handleTextBlur,
        textType, handleTextTypeChange,
        textareaRef, insertAtCursor,
    } = useNodeEditor({ node, onEdit });

    const isRoot = node.parentId === null;

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={handleNameBlur}
                    className="flex-1 text-sm font-semibold text-gray-900 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-gray-900 transition-colors"
                />
                <button
                    onClick={onAddChild}
                    className="text-xs text-gray-400 hover:text-gray-700 transition-colors shrink-0"
                >
                    + hijo
                </button>
                <button
                    onClick={onDelete}
                    className="text-xs text-gray-400 hover:text-red-500 transition-colors shrink-0"
                >
                    ✕
                </button>
            </div>

            {!isRoot && (
                <>
                    <div className="flex gap-2">
                        {(["normal", "code", "formula"] as TextType[]).map((t) => (
                            <button
                                key={t}
                                type="button"
                                onClick={() => handleTextTypeChange(t)}
                                className={`text-xs px-3 py-1 rounded-lg border transition-colors ${
                                    textType === t
                                        ? "bg-gray-900 text-white border-gray-900"
                                        : "border-gray-200 text-gray-500 hover:border-gray-400"
                                }`}
                            >
                                {t === "normal" ? "Normal" : t === "code" ? "Código" : "Fórmula"}
                            </button>
                        ))}
                    </div>

                    {textType === "formula" && (
                        <FormulaToolbar onInsert={insertAtCursor} />
                    )}

                    <textarea
                        ref={textareaRef}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onBlur={handleTextBlur}
                        placeholder={
                            textType === "formula"
                                ? "Ej: \\frac{6}{2}"
                                : "Escribe el contenido del nodo..."
                        }
                        rows={4}
                        className={`text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-gray-900 transition-colors w-full resize-none ${
                            textType === "code"
                                ? "font-mono bg-gray-900 text-green-400 placeholder:text-gray-600"
                                : textType === "formula"
                                ? "font-mono text-gray-700"
                                : "text-gray-700"
                        }`}
                    />

                    {textType === "formula" && text && (
                        <div className="border border-gray-100 rounded-lg px-4 bg-white">
                            <p className="text-xs text-gray-400 pt-2">Vista previa</p>
                            <FormulaRenderer formula={text} />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
