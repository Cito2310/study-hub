import { useEffect, useRef } from "react";
import functionPlot, { FunctionPlotDatum } from "function-plot";

interface GraphRendererProps {
    expression: string;
}

const parseExpression = (raw: string): { fn: string; points: [number, number][] } => {
    const [fnPart, pointsPart] = raw.split("|").map((s) => s.trim());
    const points: [number, number][] = [];

    if (pointsPart) {
        const matches = pointsPart.matchAll(/\(\s*(-?[\d.]+)\s*,\s*(-?[\d.]+)\s*\)/g);
        for (const match of matches) {
            points.push([parseFloat(match[1]), parseFloat(match[2])]);
        }
    }

    return { fn: fnPart ?? "", points };
};

export const GraphRenderer = ({ expression }: GraphRendererProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !expression.trim()) return;

        const { fn, points } = parseExpression(expression);
        if (!fn) return;

        const data: FunctionPlotDatum[] = [{ fn }];
        if (points.length > 0) {
            data.push({ points, fnType: "points", graphType: "scatter" });
        }

        try {
            functionPlot({
                target: containerRef.current,
                width: 300,
                height: 300,
                grid: true,
                xAxis: { domain: [-5, 5] },
                yAxis: { domain: [-5, 5] },
                data,
            });
        } catch {
            // invalid expression — leave container empty
        }
    }, [expression]);

    if (!expression.trim()) {
        return <p className="text-xs text-gray-400 italic">Sin expresión.</p>;
    }

    return <div ref={containerRef} className="w-full overflow-x-auto" />;
};
