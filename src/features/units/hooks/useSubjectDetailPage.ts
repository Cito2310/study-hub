import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { useUnitsPage } from "./useUnitsPage";

export const useSubjectDetailPage = () => {
    const { subjectId } = useParams<{ subjectId: string }>();

    const subject = useAppSelector((state) =>
        state.subjects.subjects.find((s) => s.id === subjectId)
    );

    const unitsPage = useUnitsPage(subjectId ?? "");

    return { subject, subjectId, ...unitsPage };
};
