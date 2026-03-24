import { Exam } from "../examsSlice";

interface NextExamBannerProps {
    exam: Exam | null;
}

const getDaysUntil = (dateStr: string): number => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(dateStr + "T00:00:00");
    return Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
};

export const NextExamBanner = ({ exam }: NextExamBannerProps) => {
    if (!exam) {
        return (
            <p className="text-xs text-gray-400 text-center">
                Sin parciales próximos.
            </p>
        );
    }

    const days = getDaysUntil(exam.date);
    const label = days === 0 ? "hoy" : days === 1 ? "mañana" : `${days} días`;

    return (
        <div className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 flex flex-col gap-0.5">
            <p className="text-xs font-semibold text-red-500 uppercase tracking-wide">
                Próximo parcial
            </p>
            <p className="text-sm font-medium text-gray-800">{exam.name}</p>
            <p className="text-xs text-gray-500">en {label}</p>
        </div>
    );
};
