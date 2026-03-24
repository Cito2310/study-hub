import { Unit } from "../unitsSlice";
import { UnitItem } from "./UnitItem";

interface UnitListProps {
    units: Unit[];
    onEditClick: (unit: Unit) => void;
    onDeleteClick: (unit: Unit) => void;
}

export const UnitList = ({ units, onEditClick, onDeleteClick }: UnitListProps) => {
    if (units.length === 0) {
        return (
            <p className="text-center text-xs text-gray-400 py-10">
                No hay unidades registradas. ¡Agrega una!
            </p>
        );
    }

    return (
        <ul className="flex flex-col gap-2">
            {units.map((unit) => (
                <UnitItem
                    key={unit.id}
                    unit={unit}
                    onEditClick={onEditClick}
                    onDeleteClick={onDeleteClick}
                />
            ))}
        </ul>
    );
};
