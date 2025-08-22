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
                                        Total de ventas por mes
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <Settings className="h-5 text-gray-500 cursor-pointer"/>
                                    </div>
                                </div>

                                <div className="flex-1 p-2">
                                    <LineChart
                                        horizontalAxisValues={['Jan', 'Feb', 'March', 'June', 'July']}
                                        horizontalAxisLabel="Mes"
                                        horizontalAxisType="category"
                                        verticalAxisValues={[100, 120, 233, 150, 180]}
                                        verticalAxisLabel="Ventas"
                                        verticalAxisType="value"
                                    />
                                </div>
                            </div>



                            <div className="col-span-4 row-span-4 rounded-lg bg-sidebar flex flex-col gap-2">
                                <div className="font-semibold p-3">
                                    Total de ingresos por mes
                                </div>
                                <div className="flex-1 p-2">
                                    <LineChart
                                        horizontalAxisValues={['Jan', 'Feb', 'March', 'June', 'July']}
                                        horizontalAxisLabel="Mes"
                                        horizontalAxisType="category"
                                        verticalAxisValues={[140000, 122000, 220000, 70000, 123000]}
                                        verticalAxisLabel="Ventas"
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

