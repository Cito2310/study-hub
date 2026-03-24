interface FormulaToolbarProps {
    onInsert: (snippet: string) => void;
}

const BUTTONS = [
    { label: "Fracción",   snippet: "\\frac{}{}" },
    { label: "Potencia",   snippet: "^{}" },
    { label: "Subíndice",  snippet: "_{}" },
    { label: "Raíz",       snippet: "\\sqrt{}" },
    { label: "Sumatoria",  snippet: "\\sum_{}^{}" },
    { label: "Integral",   snippet: "\\int_{}^{}" },
];

export const FormulaToolbar = ({ onInsert }: FormulaToolbarProps) => {
    return (
        <div className="flex flex-wrap gap-1">
            {BUTTONS.map((btn) => (
                <button
                    key={btn.label}
                    type="button"
                    onMouseDown={(e) => {
                        // evitar que el textarea pierda el foco antes de insertar
                        e.preventDefault();
                        onInsert(btn.snippet);
                    }}
                    className="text-xs px-2 py-1 rounded border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-800 transition-colors"
                >
                    {btn.label}
                </button>
            ))}
        </div>
    );
};
