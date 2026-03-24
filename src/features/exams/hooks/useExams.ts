import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addExam, deleteExam, Exam } from "../examsSlice";
import { STORAGE_KEYS } from "../../../shared/storageKeys";

const saveToStorage = (exams: Exam[]) => {
    localStorage.setItem(STORAGE_KEYS.exams, JSON.stringify(exams));
};

export const useExams = (subjectId: string) => {
    const dispatch = useAppDispatch();
    const allExams = useAppSelector((state) => state.exams.exams);
    const exams = allExams.filter((e) => e.subjectId === subjectId);

    const createExam = (name: string, date: string) => {
        const exam: Exam = { id: crypto.randomUUID(), subjectId, name, date };
        dispatch(addExam(exam));
        saveToStorage([...allExams, exam]);
    };

    const removeExam = (id: string) => {
        dispatch(deleteExam(id));
        saveToStorage(allExams.filter((e) => e.id !== id));
    };

    const getExamsByDate = (date: string) => exams.filter((e) => e.date === date);

    const getNextExam = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return exams
            .filter((e) => new Date(e.date + "T00:00:00") >= today)
            .sort((a, b) => a.date.localeCompare(b.date))[0] ?? null;
    };

    return { exams, createExam, removeExam, getExamsByDate, getNextExam };
};
