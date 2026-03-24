import { useNavigate } from "react-router-dom";

interface BreadcrumbItem {
    label: string;
    path?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
    const navigate = useNavigate();

    return (
        <nav className="flex items-center gap-1 text-sm mb-6">
            {items.map((item, index) => {
                const isLast = index === items.length - 1;
                return (
                    <span key={index} className="flex items-center gap-1">
                        {index > 0 && <span className="text-gray-300">/</span>}
                        {item.path && !isLast ? (
                            <button
                                onClick={() => navigate(item.path!)}
                                className="text-gray-400 hover:text-gray-700 transition-colors"
                            >
                                {item.label}
                            </button>
                        ) : (
                            <span className="text-gray-700 font-medium">{item.label}</span>
                        )}
                    </span>
                );
            })}
        </nav>
    );
};
