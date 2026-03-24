import { ModalLayout } from "../../../shared/components";

interface DeleteNodeModalProps {
    nodeName: string;
    onConfirm: () => void;
    onClose: () => void;
}

export const DeleteNodeModal = ({ nodeName, onConfirm, onClose }: DeleteNodeModalProps) => {
    return (
        <ModalLayout onClose={onClose}>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Eliminar nodo</h2>
            <p className="text-sm text-gray-500 mb-6">
                ¿Estás seguro que deseas eliminar{" "}
                <span className="font-medium text-gray-700">"{nodeName}"</span>?
                Se eliminarán también todos sus nodos hijos. Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end gap-2">
                <button
                    onClick={onClose}
                    className="text-gray-600 text-sm px-4 py-2 hover:text-gray-900 transition-colors"
                >
                    Cancelar
                </button>
                <button
                    onClick={onConfirm}
                    className="bg-red-500 text-white text-sm rounded-lg px-4 py-2 hover:bg-red-600 transition-colors"
                >
                    Eliminar
                </button>
            </div>
        </ModalLayout>
    );
};
