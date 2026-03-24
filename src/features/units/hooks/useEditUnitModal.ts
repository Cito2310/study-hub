import { useForm } from "react-hook-form";

interface EditFormValues {
    name: string;
}

interface UseEditUnitModalProps {
    unitName: string;
    onConfirm: (name: string) => void;
    onClose: () => void;
}

export const useEditUnitModal = ({ unitName, onConfirm, onClose }: UseEditUnitModalProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<EditFormValues>({
        defaultValues: { name: unitName },
    });

    const onSubmit = (data: EditFormValues) => {
        const trimmed = data.name.trim();
        if (trimmed && trimmed !== unitName) {
            onConfirm(trimmed);
        }
        onClose();
    };

    return { register, handleSubmit: handleSubmit(onSubmit), errors };
};
