import { useForm } from "react-hook-form";
import { ModalLayout } from "../../../shared/components";

interface FormValues {
    name: string;
}

interface CreateExamModalProps {
    date: string;
    onCreate: (name: string, date: string) => void;
    onClose: () => void;
}

export const CreateExamModal = ({ date, onCreate, onClose }: CreateExamModalProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
        onCreate(data.name.trim(), date);
        onClose();
    };

    const formatted = new Date(date + "T00:00:00").toLocaleDateString("es-ES", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
    });

    return (
        <ModalLayout onClose={onClose}>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Nuevo parcial</h2>
            <p className="text-xs text-gray-400 mb-4 capitalize">{formatted}</p>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div>
                    <input
                        {...register("name", { required: "El nombre es requerido" })}
                        autoFocus
                        placeholder="Ej: Primer Parcial"
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
                        Guardar
                    </button>
                </div>
            </form>
        </ModalLayout>
    );
};
