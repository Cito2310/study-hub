import { useState } from "react";
import { useForm } from "react-hook-form";
import { ModalLayout } from "../../../shared/components";

interface FormValues {
    name: string;
}

interface CreateContentModalProps {
    onCreate: (name: string, parentId: string | null) => void;
    onClose: () => void;
    parentId: string | null;
    rootContents: { id: string; name: string }[];
    canHaveChildren: (parentId: string) => boolean;
}

export const CreateContentModal = ({
    onCreate,
    onClose,
    parentId,
    rootContents,
    canHaveChildren,
}: CreateContentModalProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const [selectedParentId, setSelectedParentId] = useState<string | null>(parentId);

    const availableParents = rootContents.filter((c) => canHaveChildren(c.id));

    const onSubmit = (data: FormValues) => {
        onCreate(data.name.trim(), selectedParentId);
        onClose();
    };

    return (
        <ModalLayout onClose={onClose}>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Nuevo contenido</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div>
                    <input
                        {...register("name", { required: "El nombre es requerido" })}
                        autoFocus
                        placeholder="Nombre del contenido"
                        className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-gray-900 transition-colors w-full"
                    />
                    {errors.name && (
                        <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                    )}
                </div>

                {availableParents.length > 0 && (
                    <div>
                        <label className="text-xs text-gray-500 mb-1 block">
                            Contenido padre (opcional)
                        </label>
                        <select
                            value={selectedParentId ?? ""}
                            onChange={(e) => setSelectedParentId(e.target.value || null)}
                            className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-gray-900 transition-colors w-full"
                        >
                            <option value="">Ninguno</option>
                            {availableParents.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="flex justify-end gap-2 mt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-600 text-sm px-4 py-2 hover:text-gray-900 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="bg-gray-900 text-white text-sm rounded-lg px-4 py-2 hover:bg-gray-700 transition-colors"
                    >
                        Crear
                    </button>
                </div>
            </form>
        </ModalLayout>
    );
};
