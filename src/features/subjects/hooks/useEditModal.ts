import { useForm } from "react-hook-form";

interface EditFormValues {
    name: string;
}

interface UseEditModalProps {
    subjectName: string;
    onConfirm: (name: string) => void;
    onClose: () => void;
}

export const useEditModal = ({ subjectName, onConfirm, onClose }: UseEditModalProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<EditFormValues>({
        defaultValues: { name: subjectName },
    });

    const onSubmit = (data: EditFormValues) => {
        const trimmed = data.name.trim();
        if (trimmed && trimmed !== subjectName) {
            onConfirm(trimmed);
        }
        onClose();
    };

    return { register, handleSubmit: handleSubmit(onSubmit), errors };
};
