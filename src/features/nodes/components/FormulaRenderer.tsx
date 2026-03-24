import { useMemo } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface FormulaRendererProps {
    formula: string;
}

export const FormulaRenderer = ({ formula }: FormulaRendererProps) => {
    const html = useMemo(() => {
        try {
            return katex.renderToString(formula, { displayMode: true, throwOnError: false });
        } catch {
            return null;
        }
    }, [formula]);

    if (!html) return <p className="text-xs text-red-400">Fórmula inválida</p>;

    return (
        <div
            className="overflow-x-auto py-2"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
};
