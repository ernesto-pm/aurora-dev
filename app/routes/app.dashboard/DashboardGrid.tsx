import {useEffect, useState} from "react"
import {Settings, TrendingUp} from "lucide-react";
import LineChart from "~/components/widgets/LineChart";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "~/components/ui/select";
import {useQuery} from "@tanstack/react-query";
import {getDashboardsForSupabaseUserOptions} from "~/services/aurora/@tanstack/react-query.gen";
import { useOutletContext } from "@remix-run/react";
import {Label} from "~/components/ui/label";
import TotalSalesPerMonthWidget from "~/routes/app.dashboard/widgets/TotalSalesPerMonthWidget";

export default function DashboardGrid() {
    const {accessToken} = useOutletContext<{accessToken: string}>()
    const {data, error, isLoading, isError} = useQuery({
        ...getDashboardsForSupabaseUserOptions({
            headers: {
                'Authorization': `bearer ${accessToken}`
            }
        }),
        throwOnError: true
    })
    const [selectedDashboardId, setSelectedDashboardId] = useState<null | string>(null)

    useEffect(() => {
        if (!data) return
        if (data.length > 0) setSelectedDashboardId(data[0].id)
    }, [data])

    function handleDashboardSelectChange(dashboardId: string) {
        setSelectedDashboardId(dashboardId)
    }


    if (isLoading || data === undefined) return <div>Cargando, un momento por favor...</div>
    if (isError) return <div>{error.message}</div>
    if (!data || data.length === 0) return <div>No cuentas con ningúna conexión de datos disponible para usar el centro de control.</div>

    return (
        <div className="flex flex-col gap-7">

            <div className="flex flex-col gap-3">
                <Label>
                    Selecciona el origen de los datos:
                </Label>
                <Select value={selectedDashboardId ?? ""} onValueChange={handleDashboardSelectChange}>
                    <SelectTrigger className="w-[300px] text-sm">
                        <SelectValue placeholder="Selecciona una conexión de datos" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            data.map((dashboard) => (
                                <SelectItem key={dashboard.id} value={dashboard.id} className="text-sm">
                                    {dashboard.business_name} - {dashboard.data_source_display_name}
                                </SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
            </div>


            <div className="grid lg:grid-cols-10 gap-4">

                {
                    selectedDashboardId
                    &&
                    <TotalSalesPerMonthWidget
                        dashboardId={selectedDashboardId}
                    />
                }


                <div className="col-span-4 row-span-4 rounded-lg bg-sidebar flex flex-col gap-2 shadow-md">
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

                <div className="p-5 rounded-md bg-sidebar flex flex-col gap-2 shadow-md">
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

                <div className="p-5 rounded-md bg-sidebar flex flex-col gap-2 shadow-md">
                    <div className="text-lg font-semibold text-center">
                        Productos registrados
                    </div>
                    <div className="text-lg flex-1 text-center">
                        2800
                    </div>
                </div>

            </div>
        </div>
    )
}