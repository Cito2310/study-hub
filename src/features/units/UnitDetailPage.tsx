import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { Breadcrumb } from "../../shared/components/Breadcrumb";

export const UnitDetailPage = () => {
    const { subjectId, unitId } = useParams<{ subjectId: string; unitId: string }>();

    const subject = useAppSelector((state) =>
        state.subjects.subjects.find((s) => s.id === subjectId)
    );

    const unit = useAppSelector((state) =>
        state.units.units.find((u) => u.id === unitId)
    );

    if (!subject || !unit) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-10">
                <p className="text-sm text-gray-500">Unidad no encontrada.</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <Breadcrumb
                items={[
                    { label: "Materias", path: "/" },
                    { label: subject.name, path: `/subjects/${subjectId}` },
                    { label: unit.name },
                ]}
            />
        </div>
    );
};
