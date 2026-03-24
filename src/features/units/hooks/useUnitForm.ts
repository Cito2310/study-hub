import { useForm } from "react-hook-form";

interface UnitFormValues {
    name: string;
}

interface UseUnitFormProps {
    onCreate: (name: string) => void;
}

export const useUnitForm = ({ onCreate }: UseUnitFormProps) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<UnitFormValues>();

    const onSubmit = (data: UnitFormValues) => {
        onCreate(data.name.trim());
        reset();
    };

    return { register, handleSubmit: handleSubmit(onSubmit), errors };
};
