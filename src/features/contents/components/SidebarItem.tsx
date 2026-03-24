import { Content } from "../contentsSlice";

interface SidebarItemProps {
    content: Content;
    children?: Content[];
    selectedId: string | null;
    onSelect: (content: Content) => void;
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
}

export const SidebarItem = ({
    content,
    children = [],
    selectedId,
    onSelect,
    onDelete,
    onToggle,
}: SidebarItemProps) => {
    const isSelected = selectedId === content.id;

    return (
        <li>
            <div
                className={`group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                    isSelected ? "bg-gray-900 text-white" : "hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => onSelect(content)}
            >
                <button
                    onClick={(e) => { e.stopPropagation(); onToggle(content.id); }}
                    className={`w-4 h-4 shrink-0 rounded border flex items-center justify-center transition-colors ${
                        content.checked
                            ? "bg-green-500 border-green-500"
                            : isSelected
                            ? "border-gray-400"
                            : "border-gray-300 hover:border-gray-500"
                    }`}
                >
                    {content.checked && (
                        <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                </button>

                <span className={`flex-1 text-sm truncate ${content.checked ? "line-through opacity-50" : ""}`}>
                    {content.name}
                </span>

                <button
                    onClick={(e) => { e.stopPropagation(); onDelete(content.id); }}
                    className={`text-xs px-1 opacity-0 group-hover:opacity-100 transition-opacity ${
                        isSelected ? "text-gray-300 hover:text-white" : "text-gray-400 hover:text-red-500"
                    }`}
                >
                    ✕
                </button>
            </div>

            {children.length > 0 && (
                <ul className="ml-4 mt-1 flex flex-col gap-1">
                    {children.map((child) => (
                        <SidebarItem
                            key={child.id}
                            content={child}
                            selectedId={selectedId}
                            onSelect={onSelect}
                            onDelete={onDelete}
                            onToggle={onToggle}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};
