import { SidebarInset } from "~/components/ui/sidebar";
import AppHeader from "~/routes/app/AppHeader";
import type { MetaFunction } from "@remix-run/cloudflare";
import {Bot, Brain, BrainCircuit, Cog, MessageCircleMore, Settings, TrendingUp} from "lucide-react";
import LineChart from "~/components/widgets/LineChart";
import {Message} from "@letta-ai/letta-client/serialization";

export const meta: MetaFunction = () => {
    return [
        { title: "Aurora | Centro de Control" }
    ];
};

export default function Dashboard() {
    return (
        <SidebarInset>

            <AppHeader headerTitle="Centro de Control"/>

            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="py-4 px-6">
                        <div className="grid lg:grid-cols-10 gap-4">

                            <div className="col-span-4 row-span-4 rounded-lg bg-sidebar flex flex-col gap-2">

                                <div className="px-4 py-2 bg-sidebar-accent rounded-t-lg flex flex-row">
                                    <div className="flex-1 text-sm font-semibold">
                                        Total de Ordenes por mes
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <Settings className="h-4 text-gray-500 cursor-pointer"/>
                                    </div>
                                </div>

                                <div className="flex-1 p-2">
                                    <LineChart
                                        horizontalAxisValues={[
                                            "2022-02-01T00:00:00+00:00",
                                            "2022-04-01T00:00:00+00:00",
                                            "2022-05-01T00:00:00+00:00",
                                            "2022-06-01T00:00:00+00:00",
                                            "2022-07-01T00:00:00+00:00",
                                            "2022-08-01T00:00:00+00:00",
                                            "2022-09-01T00:00:00+00:00",
                                            "2022-10-01T00:00:00+00:00",
                                            "2022-11-01T00:00:00+00:00",
                                            "2022-12-01T00:00:00+00:00",
                                            "2023-01-01T00:00:00+00:00",
                                            "2023-02-01T00:00:00+00:00",
                                            "2023-03-01T00:00:00+00:00",
                                            "2023-04-01T00:00:00+00:00",
                                            "2023-05-01T00:00:00+00:00",
                                            "2023-06-01T00:00:00+00:00",
                                            "2023-07-01T00:00:00+00:00",
                                            "2023-08-01T00:00:00+00:00",
                                            "2023-09-01T00:00:00+00:00",
                                            "2023-10-01T00:00:00+00:00",
                                            "2023-11-01T00:00:00+00:00",
                                            "2023-12-01T00:00:00+00:00",
                                            "2024-01-01T00:00:00+00:00",
                                            "2024-02-01T00:00:00+00:00",
                                            "2024-03-01T00:00:00+00:00",
                                            "2024-04-01T00:00:00+00:00",
                                            "2024-05-01T00:00:00+00:00",
                                            "2024-06-01T00:00:00+00:00",
                                            "2024-07-01T00:00:00+00:00",
                                            "2024-08-01T00:00:00+00:00",
                                            "2024-09-01T00:00:00+00:00",
                                            "2024-10-01T00:00:00+00:00",
                                            "2024-11-01T00:00:00+00:00",
                                            "2024-12-01T00:00:00+00:00",
                                            "2025-01-01T00:00:00+00:00",
                                            "2025-02-01T00:00:00+00:00",
                                            "2025-03-01T00:00:00+00:00",
                                            "2025-04-01T00:00:00+00:00",
                                            "2025-05-01T00:00:00+00:00",
                                            "2025-06-01T00:00:00+00:00",
                                            "2025-07-01T00:00:00+00:00"
                                        ]}
                                        horizontalAxisLabel="Fecha"
                                        horizontalAxisType="time"
                                        verticalAxisValues={[
                                            1,
                                            3,
                                            47,
                                            215,
                                            211,
                                            212,
                                            212,
                                            169,
                                            170,
                                            105,
                                            174,
                                            165,
                                            172,
                                            125,
                                            167,
                                            191,
                                            134,
                                            158,
                                            174,
                                            151,
                                            145,
                                            92,
                                            162,
                                            173,
                                            161,
                                            145,
                                            180,
                                            136,
                                            112,
                                            174,
                                            142,
                                            144,
                                            143,
                                            85,
                                            167,
                                            173,
                                            149,
                                            128,
                                            178,
                                            139,
                                            94
                                        ]}
                                        verticalAxisLabel="Total"
                                        verticalAxisType="value"
                                    />
                                </div>
                            </div>


                            <div className="p-5 rounded-md bg-sidebar flex flex-col gap-2">
                                <div className="text-md font-bold text-center">
                                    Ventas en promedio este mes
                                </div>
                                <div className="text-2xl flex-1 text-center">
                                    <div className="flex justify-center items-center gap-2">
                                        <TrendingUp className="text-green-800"/>
                                        <div className="text-green-800 font-semibold">150</div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-5 rounded-md bg-sidebar flex flex-col gap-2">
                                <div className="text-lg font-semibold text-center">
                                    Productos registrados
                                </div>
                                <div className="text-lg flex-1 text-center">
                                    2800
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </SidebarInset>
    )
}

