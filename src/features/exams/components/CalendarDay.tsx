import { Exam } from "../examsSlice";

interface CalendarDayProps {
    day: number;
    isToday: boolean;
    isSelected: boolean;
    exams: Exam[];
    onClick: () => void;
}

export const CalendarDay = ({ day, isToday, isSelected, exams, onClick }: CalendarDayProps) => {
    const hasExam = exams.length > 0;

    return (
        <button
            onClick={onClick}
            className={`relative flex flex-col items-center justify-start pt-1 h-10 w-full rounded-lg text-xs transition-colors
                ${isSelected ? "bg-gray-900 text-white" : isToday ? "bg-gray-100 font-semibold text-gray-900" : "text-gray-600 hover:bg-gray-50"}
            `}
        >
            <span>{day}</span>
            {hasExam && (
                <span className={`w-1 h-1 rounded-full mt-0.5 ${isSelected ? "bg-white" : "bg-red-400"}`} />
            )}
        </button>
    );
};
