import { useForm } from "react-hook-form";

interface FormValues {
    name: string;
}

interface UseCreateNodeModalProps {
    onCreate: (name: string, parentId: string | null) => void;
    onClose: () => void;
    parentId: string | null;
}

export const useCreateNodeModal = ({ onCreate, onClose, parentId }: UseCreateNodeModalProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
        onCreate(data.name.trim(), parentId);
        onClose();
    };

    return { register, handleSubmit: handleSubmit(onSubmit), errors };
};
