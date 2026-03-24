import { Exam } from "../examsSlice";
import { useCalendar, useExams } from "../hooks";
import { CalendarDay } from "./CalendarDay";
import { CreateExamModal } from "./CreateExamModal";
import { useState } from "react";

interface CalendarProps {
    subjectId: string;
}

export const Calendar = ({ subjectId }: CalendarProps) => {
    const {
        year, month, monthName, days,
        getDaysInMonth, getFirstDayOfMonth,
        prevMonth, nextMonth,
        selectedDate, setSelectedDate,
        toISODate, isToday,
    } = useCalendar();

    const { createExam, removeExam, getExamsByDate } = useExams(subjectId);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const daysInMonth = getDaysInMonth();
    const firstDay = getFirstDayOfMonth();
    const blanks = Array(firstDay).fill(null);
    const dayNumbers = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const selectedExams = selectedDate ? getExamsByDate(selectedDate) : [];

    const handleDayClick = (day: number) => {
        const iso = toISODate(day);
        setSelectedDate(iso === selectedDate ? null : iso);
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <button
                    onClick={prevMonth}
                    className="text-gray-400 hover:text-gray-700 transition-colors px-1"
                >
                    ←
                </button>
                <span className="text-sm font-medium text-gray-700">
                    {monthName} {year}
                </span>
                <button
                    onClick={nextMonth}
                    className="text-gray-400 hover:text-gray-700 transition-colors px-1"
                >
                    →
                </button>
            </div>

            {/* Day labels */}
            <div className="grid grid-cols-7 gap-1">
                {days.map((d) => (
                    <span key={d} className="text-center text-xs text-gray-400 font-medium">
                        {d}
                    </span>
                ))}

                {/* Blanks */}
                {blanks.map((_, i) => <div key={`b-${i}`} />)}

                {/* Days */}
                {dayNumbers.map((day) => {
                    const iso = toISODate(day);
                    return (
                        <CalendarDay
                            key={day}
                            day={day}
                            isToday={isToday(day)}
                            isSelected={selectedDate === iso}
                            exams={getExamsByDate(iso)}
                            onClick={() => handleDayClick(day)}
                        />
                    );
                })}
            </div>

            {/* Selected day info */}
            {selectedDate && (
                <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                    {selectedExams.length > 0 ? (
                        <>
                            {selectedExams.map((exam) => (
                                <div key={exam.id} className="flex items-center justify-between">
                                    <span className="text-xs text-gray-700">{exam.name}</span>
                                    <button
                                        onClick={() => removeExam(exam.id)}
                                        className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </>
                    ) : (
                        <p className="text-xs text-gray-400">Sin parciales este día.</p>
                    )}
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="text-xs text-gray-500 hover:text-gray-900 transition-colors text-left"
                    >
                        + Añadir parcial
                    </button>
                </div>
            )}

            {showCreateModal && selectedDate && (
                <CreateExamModal
                    date={selectedDate}
                    onCreate={createExam}
                    onClose={() => setShowCreateModal(false)}
                />
            )}
        </div>
    );
};
