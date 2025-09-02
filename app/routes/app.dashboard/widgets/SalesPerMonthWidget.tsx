import {useQuery} from "@tanstack/react-query";
import {getSalesPerMonthOptions} from "~/services/aurora/@tanstack/react-query.gen";
import {Settings} from "lucide-react";
import LineChart from "~/components/widgets/LineChart";
import BarChart from "~/components/widgets/BarChart";

interface TotalSalesPerMonthProptypes {
    dashboardId: string
}

export default function SalesPerMonthWidget(props: TotalSalesPerMonthProptypes) {
    const {data, isError, error, isLoading} = useQuery({
        ...getSalesPerMonthOptions({
            body: {
                dashboardId: props.dashboardId
            },
            throwOnError: true
        })
    })

    if (isLoading || data === undefined) return <div>Cargando...</div>
    if (isError) return <div>{error.message}</div>
    if (!data) return <div>No hay datos para este widget</div>

    // console.log(data)

    return (
        <div className="col-span-4 row-span-4 rounded-lg bg-sidebar flex flex-col gap-2 shadow-md min-h-[250px]">
            <div className="px-4 py-2 bg-sidebar-accent rounded-t-lg flex flex-row">
                <div className="flex-1 text-sm font-semibold">
                    Total de ventas por mes
                </div>
                <div className="flex flex-row gap-2 items-center">
                    {/*
                     <Settings className="h-4 text-gray-500 cursor-pointer"/>
                    */}
                </div>
            </div>

            <div className="flex-1 p-2">
                <BarChart
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