import { Content } from "../contentsSlice";
import { SidebarItem } from "./SidebarItem";

interface SidebarProps {
    rootContents: Content[];
    getChildren: (parentId: string) => Content[];
    selectedId: string | null;
    onSelect: (content: Content) => void;
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
    onAdd: () => void;
}

export const Sidebar = ({
    rootContents,
    getChildren,
    selectedId,
    onSelect,
    onDelete,
    onToggle,
    onAdd,
}: SidebarProps) => {
    return (
        <aside className="w-64 shrink-0 border-r border-gray-200 min-h-screen px-4 py-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Contenidos
                </h3>
                <button
                    onClick={onAdd}
                    className="text-xs text-gray-500 hover:text-gray-900 transition-colors px-2 py-1 rounded hover:bg-gray-100"
                >
                    + Añadir
                </button>
            </div>

            {rootContents.length === 0 ? (
                <p className="text-xs text-gray-400">Sin contenidos aún.</p>
            ) : (
                <ul className="flex flex-col gap-1">
                    {rootContents.map((content) => (
                        <SidebarItem
                            key={content.id}
                            content={content}
                            children={getChildren(content.id)}
                            selectedId={selectedId}
                            onSelect={onSelect}
                            onDelete={onDelete}
                            onToggle={onToggle}
                        />
                    ))}
                </ul>
            )}
        </aside>
    );
};
