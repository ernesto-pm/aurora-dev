import {useQuery} from "@tanstack/react-query";
import {getSalesPerMonthWidgetDataOptions} from "~/services/aurora/@tanstack/react-query.gen";
import {Settings} from "lucide-react";
import LineChart from "~/components/widgets/LineChart";

interface TotalSalesPerMonthProptypes {
    dashboardId: string
}

export default function TotalSalesPerMonthWidget(props: TotalSalesPerMonthProptypes) {
    const {data, isError, error, isLoading} = useQuery({
        ...getSalesPerMonthWidgetDataOptions({
            body: {
                dashboardId: props.dashboardId
            },
            throwOnError: true
        })
    })

    if (isLoading) return <div>Cargando...</div>
    if (isError) return <div>{error.message}</div>
    if (!data) return <div>No hay datos para este widget</div>

    // console.log(data)

    return (
        <div className="col-span-4 row-span-4 rounded-lg bg-sidebar flex flex-col gap-2 shadow-md">
            <div className="px-4 py-2 bg-sidebar-accent rounded-t-lg flex flex-row">
                <div className="flex-1 text-sm font-semibold">
                    Total de ventas por mes
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <Settings className="h-4 text-gray-500 cursor-pointer"/>
                </div>
            </div>

            <div className="flex-1 p-2">
                <LineChart
                    horizontalAxisLabel="Mes"
                    verticalAxisLabel="Ventas"

                    horizontalAxisValues={data.horizontalAxisValues}
                    verticalAxisValues={data.verticalAxisValues}
                    horizontalAxisType={data.horizontalAxisType}
                    verticalAxisType={data.verticalAxisType}
                />
            </div>
        </div>
    )
}