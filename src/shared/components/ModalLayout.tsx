interface ModalLayoutProps {
    onClose: () => void;
    children: React.ReactNode;
}

export const ModalLayout = ({ onClose, children }: ModalLayoutProps) => {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};
