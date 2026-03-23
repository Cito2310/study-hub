import { Subject } from "../subjectsSlice";

interface SubjectItemProps {
    subject: Subject;
    onEditClick: (subject: Subject) => void;
    onDeleteClick: (subject: Subject) => void;
}

export const SubjectItem = ({ subject, onEditClick, onDeleteClick }: SubjectItemProps) => {
    return (
        <li className="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg">
            <span className="flex-1 text-sm text-gray-700">{subject.name}</span>
            <div className="flex gap-1">
                <button
                    onClick={() => onEditClick(subject)}
                    className="text-gray-600 text-sm px-3 py-1 hover:text-gray-900 transition-colors"
                >
                    Editar
                </button>
                <button
                    onClick={() => onDeleteClick(subject)}
                    className="text-red-400 text-sm px-3 py-1 hover:text-red-600 transition-colors"
                >
                    Eliminar
                </button>
            </div>
        </li>
    );
};
