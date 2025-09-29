import { MessageCircle } from "lucide-react";

type AssocRule = {
    id: string;
    antecedent: string[];
    consequent: string[];
    confidence: number;
    lift: number;
    support?: number;
};

const mockRules: AssocRule[] = [
    {
        id: "r1",
        antecedent: ["M2 MODICO 2 SELLO PERSONALIZADO (37x11mm)"],
        consequent: ["R45 MODICO SELLO PERSONALIZADO 42mm"],
        confidence: 0.62,
        lift: 1.48,
        support: 0.19,
    },
    {
        id: "r2",
        antecedent: ["MP4 POCKET 4 MOUNT GREEN"],
        consequent: ["MP4 POCKET 4 MOUNT DARK BLUE"],
        confidence: 0.53,
        lift: 1.32,
        support: 0.14,
    },
    {
        id: "r3",
        antecedent: ["Sello para vaso de papel"],
        consequent: [
            "M2 MODICO 2 SELLO PERSONALIZADO (37x11mm)",
            "R45 MODICO SELLO PERSONALIZADO 42mm",
        ],
        confidence: 0.41,
        lift: 1.12,
        support: 0.11,
    },
    {
        id: "r4",
        antecedent: ["R45 MODICO SELLO PERSONALIZADO 42mm", "MP4 POCKET 4 MOUNT DARK BLUE"],
        consequent: ["Tinta Negra Repuesto 10ml"],
        confidence: 0.37,
        lift: 1.67,
        support: 0.08,
    },
];

function pct(n: number) {
    return `${Math.round(n * 100)}%`;
}

function LiftBadge({ lift }: { lift: number }) {
    const cls =
        lift >= 1.5 ? "bg-emerald-600" : lift >= 1.2 ? "bg-amber-600" : "bg-slate-600";
    return (
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full text-white ${cls}`}>
      lift {lift.toFixed(2)}
    </span>
    );
}

function ConfidenceBar({ value }: { value: number }) {
    const w = Math.min(100, Math.max(0, value * 100));
    return (
        <div className="w-28 h-2.5 rounded-full bg-slate-700/50 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-green-500" style={{ width: `${w}%` }} />
        </div>
    );
}

export default function MockAntecedentSubsequentWidget() {
    return (
        <div className="h-full w-full">
            {/* Gradient border */}
            <div className="h-full p-[1.5px] rounded-xl bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 shadow-md">
                {/* Card */}
                <div className="rounded-xl bg-sidebar flex flex-col h-full min-h-0">
                    {/* Header */}
                    <div className="px-4 py-2 bg-sidebar-accent rounded-t-xl flex items-center gap-2">
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold truncate">AI Product Associations</div>
                        </div>
                        <span className="text-[10px] font-bold uppercase bg-gradient-to-r from-purple-500 to-blue-500 text-white px-2 py-0.5 rounded-full shadow">
              AI
            </span>
                        <button
                            type="button"
                            className="flex items-center justify-center rounded-full p-1.5 bg-gradient-to-r from-blue-500 to-green-500 text-white shadow hover:opacity-90 transition"
                            title="Open Assistant"
                            onClick={() => console.log("Open chat assistant")}
                        >
                            <MessageCircle className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Body must be allowed to shrink: min-h-0 */}
                    <div className="flex-1 p-3 min-h-0 min-w-0">
                        {/* Frame for borders; make it flex so the scroller can fill and scroll */}
                        <div className="h-full w-full rounded-md border border-slate-800 overflow-hidden flex flex-col min-h-0">
                            {/* SCROLLER: both axes */}
                            <div className="flex-1 overflow-x-auto overflow-y-auto min-h-0 min-w-0">
                                {/* Force horizontal scroll availability on narrow screens */}
                                <table className="min-w-[900px] w-full text-sm">
                                    <thead className="bg-slate-900/40">
                                    <tr className="text-left">
                                        <th className="px-3 py-2 font-medium text-slate-300 min-w-[240px]">Antecedent</th>
                                        <th className="px-3 py-2 font-medium text-slate-300 min-w-[260px]">→ Consequent</th>
                                        <th className="px-3 py-2 font-medium text-slate-300 min-w-[160px]">Confidence</th>
                                        <th className="px-3 py-2 font-medium text-slate-300 min-w-[120px]">Lift</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800">
                                    {mockRules.map((r) => (
                                        <tr key={r.id} className="align-middle">
                                            <td className="px-3 py-2">
                                                <div className="flex flex-wrap gap-1 max-w-[40rem]">
                                                    {r.antecedent.map((a, i) => (
                                                        <span
                                                            key={`${r.id}-a-${i}`}
                                                            className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-200 text-[11px] max-w-[16rem] truncate"
                                                            title={a}
                                                        >
                                {a}
                              </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-3 py-2">
                                                <div className="flex flex-wrap gap-1 max-w-[40rem]">
                                                    {r.consequent.map((c, i) => (
                                                        <span
                                                            key={`${r.id}-c-${i}`}
                                                            className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-200 text-[11px] max-w-[16rem] truncate"
                                                            title={c}
                                                        >
                                {c}
                              </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-3 py-2">
                                                <div className="flex items-center gap-2">
                                                    <ConfidenceBar value={r.confidence} />
                                                    <span className="text-slate-300 tabular-nums whitespace-nowrap">
                              {pct(r.confidence)}
                            </span>
                                                </div>
                                            </td>
                                            <td className="px-3 py-2 whitespace-nowrap">
                                                <LiftBadge lift={r.lift} />
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
