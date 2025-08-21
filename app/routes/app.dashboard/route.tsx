import { SidebarInset } from "~/components/ui/sidebar";
import AppHeader from "~/routes/app/AppHeader";
import type { MetaFunction } from "@remix-run/cloudflare";
import {ArrowUp, TrendingUp} from "lucide-react";

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
                        <div className="grid grid-cols-5 gap-4">

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

