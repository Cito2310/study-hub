import { useNavigate } from "react-router-dom";
import { Unit } from "../unitsSlice";

interface UnitItemProps {
    unit: Unit;
    onEditClick: (unit: Unit) => void;
    onDeleteClick: (unit: Unit) => void;
}

export const UnitItem = ({ unit, onEditClick, onDeleteClick }: UnitItemProps) => {
    const navigate = useNavigate();

    return (
        <li className="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg">
            <button
                onClick={() => navigate(`/subjects/${unit.subjectId}/units/${unit.id}`)}
                className="flex-1 text-sm text-gray-700 text-left hover:text-gray-900 transition-colors"
            >
                {unit.name}
            </button>
            <div className="flex gap-1">
                <button
                    onClick={() => onEditClick(unit)}
                    className="text-gray-600 text-sm px-3 py-1 hover:text-gray-900 transition-colors"
                >
                    Editar
                </button>
                <button
                    onClick={() => onDeleteClick(unit)}
                    className="text-red-400 text-sm px-3 py-1 hover:text-red-600 transition-colors"
                >
                    Eliminar
                </button>
            </div>
        </li>
    );
};
