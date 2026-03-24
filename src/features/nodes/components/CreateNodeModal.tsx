import { ModalLayout } from "../../../shared/components";
import { useCreateNodeModal } from "../hooks";

interface CreateNodeModalProps {
    onCreate: (name: string, parentId: string | null) => void;
    onClose: () => void;
    parentId: string | null;
}

export const CreateNodeModal = ({ onCreate, onClose, parentId }: CreateNodeModalProps) => {
    const { register, handleSubmit, errors } = useCreateNodeModal({ onCreate, onClose, parentId });

    return (
        <ModalLayout onClose={onClose}>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {parentId ? "Nuevo nodo hijo" : "Nuevo nodo"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <input
                        {...register("name", { required: "El nombre es requerido" })}
                        autoFocus
                        placeholder="Nombre del nodo"
                        className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-gray-900 transition-colors w-full"
                    />
                    {errors.name && (
                        <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                    )}
                </div>
                <div className="flex justify-end gap-2">
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
