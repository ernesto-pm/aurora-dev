import ReactECharts from 'echarts-for-react';
import { ClientOnly } from "remix-utils/client-only";
import { useEffect, useState } from "react";

/**
 * RFM Heatmap (hardcoded data)
 * X: Recency buckets
 * Y: Frequency buckets
 * Cell value: Customer count
 * Tooltip: Count + Avg Monetary (AOV)
 */
export default function RfmHeatmap() {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setIsMounted(true), 150);
        return () => clearTimeout(t);
    }, []);

    if (!isMounted) return <div />;

    function getOption() {
        // ---- Buckets (edit as needed) ----
        const recencyBuckets = ["0–7d", "8–14d", "15–30d", "31–60d", "61–90d", "90d+"];
        // Render top to bottom: High -> Low
        const frequencyBuckets = ["High (10+)", "Med-High (6–9)", "Medium (3–5)", "Low (1–2)"];

        // ---- Hardcoded mock data ----
        // counts[fy][rx] : number of customers for Frequency index fy, Recency index rx
        const counts = [
            // High (10+)
            [42, 35, 28, 21, 12, 7],
            // Med-High (6–9)
            [38, 33, 27, 18, 11, 6],
            // Medium (3–5)
            [31, 29, 24, 16, 9, 4],
            // Low (1–2)
            [26, 22, 19, 12, 7, 3],
        ];

        // avgMonetary[fy][rx] : average order value (USD) in each cell
        const avgMonetary = [
            [84, 80, 76, 70, 66, 60],
            [78, 75, 72, 67, 62, 58],
            [72, 70, 66, 62, 58, 55],
            [68, 65, 61, 58, 54, 50],
        ];

        // Optional segment labels per cell (simple illustrative mapping)
        // “Champions”, “Loyal”, “Promising”, “At Risk”, “Hibernating”, etc.
        const segment = [
            ["Champions", "Champions", "Loyal", "Loyal", "At Risk", "Hibernating"],
            ["Loyal", "Loyal", "Promising", "Promising", "At Risk", "Hibernating"],
            ["Potential", "Potential", "Promising", "Promising", "At Risk", "Hibernating"],
            ["New/Lapsed", "New/Lapsed", "New/Lapsed", "Warm-up", "Dormant", "Dormant"],
        ];

        // Convert to heatmap triplets [x, y, value]
        const heatData = [];
        for (let fy = 0; fy < frequencyBuckets.length; fy++) {
            for (let rx = 0; rx < recencyBuckets.length; rx++) {
                heatData.push([rx, fy, counts[fy][rx]]);
            }
        }

        // Compute global min/max for visualMap
        const flatCounts = counts.flat();
        const vmin = Math.min(...flatCounts);
        const vmax = Math.max(...flatCounts);

        return {
            title: {
                text: "RFM Heatmap — Customer Segmentation",
                left: "center",
                top: 8,
                textStyle: { fontSize: 14 }
            },
            tooltip: {
                trigger: "item",
                confine: true,
                formatter: (p: any) => {
                    const rx = p.data[0], fy = p.data[1];
                    const count = p.data[2];
                    const aov = avgMonetary[fy][rx];
                    const seg = segment[fy][rx];
                    return `
            <div style="min-width:200px">
              <b>${seg}</b><br/>
              Recency: <b>${recencyBuckets[rx]}</b><br/>
              Frequency: <b>${frequencyBuckets[fy]}</b><br/>
              Customers: <b>${count}</b><br/>
              Avg Monetary: <b>$${aov.toFixed(0)}</b>
            </div>
          `;
                }
            },
            grid: {},
            xAxis: {
                type: "category",
                data: recencyBuckets,
                name: "Recency",
                nameLocation: "middle",

                axisTick: { alignWithLabel: true }
            },
            yAxis: {
                type: "category",
                data: frequencyBuckets,
                name: "Frequency",
                nameLocation: "middle",

                axisTick: { alignWithLabel: true }
            },
            visualMap: {
                min: vmin,
                max: vmax,
                calculable: true,
                orient: "horizontal",
                left: "center",

                // Piecewise or continuous; continuous is simpler here
                inRange: { color: ["#f2f5ff", "#9bbcff", "#4361ee"] },
                text: ["High", "Low"]
            },
            series: [
                {
                    name: "Customers",
                    type: "heatmap",
                    data: heatData,
                    label: {
                        show: true,
                        formatter: (p: any) => {
                            const rx = p.data[0], fy = p.data[1];
                            // Show count; optionally show short segment code
                            return counts[fy][rx];
                        }
                    },
                    emphasis: {
                        itemStyle: { shadowBlur: 8, shadowColor: "rgba(0,0,0,0.3)" }
                    }
                },
                // Optional overlay: show segment tags as small text
                {
                    name: "Segments",
                    type: "custom",
                    renderItem: (params: any, api: any) => {
                        const rx = api.value(0);
                        const fy = api.value(1);
                        const coord = api.coord([rx, fy]);
                        const size = api.size([1, 1]); // cell size
                        const seg = api.value(2);
                        return {
                            type: "text",
                            style: {
                                text: seg,
                                x: coord[0] + size[0] / 2,
                                y: coord[1] + size[1] / 2 + 12,
                                textAlign: "center",
                                textVerticalAlign: "top",
                                fontSize: 10,
                                fill: "rgba(0,0,0,0.65)"
                            },
                            silent: true
                        };
                    },
                    encode: { x: 0, y: 1 },
                    data: (() => {
                        const out: [number, number, string][] = [];
                        for (let fy = 0; fy < frequencyBuckets.length; fy++) {
                            for (let rx = 0; rx < recencyBuckets.length; rx++) {
                                out.push([rx, fy, segment[fy][rx]]);
                            }
                        }
                        return out;
                    })()
                }
            ]
        };
    }

    return (
        <ClientOnly fallback={<div>Cargando mapa de calor…</div>}>
            {() => (
                <ReactECharts
                    lazyUpdate
                    option={getOption()}
                    style={{ width: "100%", height: "100%" }}
                />
            )}
        </ClientOnly>
    );
}
