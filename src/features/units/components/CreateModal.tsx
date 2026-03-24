import { ModalLayout } from "../../../shared/components";
import { useUnitForm } from "../hooks";

interface CreateModalProps {
    onCreate: (name: string) => void;
    onClose: () => void;
}

export const CreateModal = ({ onCreate, onClose }: CreateModalProps) => {
    const { register, handleSubmit, errors } = useUnitForm({
        onCreate: (name) => {
            onCreate(name);
            onClose();
        },
    });

    return (
        <ModalLayout onClose={onClose}>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Nueva unidad</h2>
            <form onSubmit={handleSubmit}>
                <input
                    {...register("name", { required: "El nombre es requerido" })}
                    autoFocus
                    placeholder="Nombre de la unidad"
                    className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-gray-900 transition-colors w-full"
                />
                {errors.name && (
                    <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                )}
                <div className="flex justify-end gap-2 mt-6">
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
