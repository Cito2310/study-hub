import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormValues {
    name: string;
}

interface UseCreateContentModalProps {
    onCreate: (name: string, parentId: string | null) => void;
    onClose: () => void;
    parentId: string | null;
    rootContents: { id: string; name: string }[];
    canHaveChildren: (parentId: string) => boolean;
}

export const useCreateContentModal = ({
    onCreate,
    onClose,
    parentId,
    rootContents,
    canHaveChildren,
}: UseCreateContentModalProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const [selectedParentId, setSelectedParentId] = useState<string | null>(parentId);

    const availableParents = rootContents.filter((c) => canHaveChildren(c.id));

    const onSubmit = (data: FormValues) => {
        onCreate(data.name.trim(), selectedParentId);
        onClose();
    };

    return {
        register,
        handleSubmit: handleSubmit(onSubmit),
        errors,
        selectedParentId,
        setSelectedParentId,
        availableParents,
    };
};
