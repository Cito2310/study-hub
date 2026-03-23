import { useForm } from "react-hook-form";

interface SubjectFormValues {
    name: string;
}

interface UseSubjectFormProps {
    onCreate: (name: string) => void;
}

export const useSubjectForm = ({ onCreate }: UseSubjectFormProps) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<SubjectFormValues>();

    const onSubmit = (data: SubjectFormValues) => {
        onCreate(data.name.trim());
        reset();
    };

    return { register, handleSubmit: handleSubmit(onSubmit), errors };
};
