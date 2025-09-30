import {useEffect, useState} from "react"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "~/components/ui/select";
import {useQuery} from "@tanstack/react-query";
import {getDashboardsForSupabaseUserOptions} from "~/services/aurora/@tanstack/react-query.gen";
import { useOutletContext } from "@remix-run/react";
import {Label} from "~/components/ui/label";
import SalesPerMonthWidget from "~/routes/app.dashboard/widgets/SalesPerMonthWidget";
import OrderRevenuePerMonthWidget from "~/routes/app.dashboard/widgets/OrderRevenuePerMonthWidget";
import BestSellingVariantsGroupedByProductWidget
    from "~/routes/app.dashboard/widgets/BestSellingVariantsGroupedByProductWidget";
import TotalsForProductsWithoutVariants from "~/routes/app.dashboard/widgets/TotalsForProductsWithoutVariants";
import TotalsForVariants from "./widgets/TotalsForVariants";

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
                    <SalesPerMonthWidget
                        dashboardId={selectedDashboardId}
                    />
                }

                {
                    selectedDashboardId
                    &&
                    <OrderRevenuePerMonthWidget
                        dashboardId={selectedDashboardId}
                    />
                }

                {
                    selectedDashboardId
                    &&
                    <BestSellingVariantsGroupedByProductWidget
                        dashboardId={selectedDashboardId}
                    />
                }

                {
                    selectedDashboardId
                    &&
                    <TotalsForProductsWithoutVariants
                        dashboardId={selectedDashboardId}
                    />
                }

                {
                    selectedDashboardId
                    &&
                    <TotalsForVariants
                        dashboardId={selectedDashboardId}
                    />
                }

            </div>
        </div>
    )
}