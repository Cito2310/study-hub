import { Subject } from "../subjectsSlice";
import { SubjectItem } from "./SubjectItem";

interface SubjectListProps {
    subjects: Subject[];
    onEditClick: (subject: Subject) => void;
    onDeleteClick: (subject: Subject) => void;
}

export const SubjectList = ({ subjects, onEditClick, onDeleteClick }: SubjectListProps) => {
    if (subjects.length === 0) {
        return (
            <p className="text-center text-xs text-gray-400 py-10">
                No hay materias registradas. ¡Agrega una!
            </p>
        );
    }

    return (
        <ul className="flex flex-col gap-2">
            {subjects.map((subject) => (
                <SubjectItem
                    key={subject.id}
                    subject={subject}
                    onEditClick={onEditClick}
                    onDeleteClick={onDeleteClick}
                />
            ))}
        </ul>
    );
};
