import {useQuery} from "@tanstack/react-query";
import {getRevenueConcentrationOptions} from "~/services/aurora/@tanstack/react-query.gen";
import ParetoChart from "~/components/widgets/ParetoChart";

interface RevenueConcentrationParetoChartWidgetProptypes {
    dashboardId: string
}

export default function RevenueConcentrationParetoChartWidget(props: RevenueConcentrationParetoChartWidgetProptypes) {
    const {data, isError, error, isLoading} = useQuery({
        ...getRevenueConcentrationOptions({
            body: {
                dashboardId: props.dashboardId
            },
            throwOnError: true
        })
    })

    if (isLoading || data === undefined) return <div>Cargando...</div>
    if (isError) return <div>{error.message}</div>
    if (!data) return <div>No hay datos para este widget</div>

    return (
        <div className="rounded-lg bg-sidebar flex flex-col gap-2 shadow-md h-full w-full">
            <div className="px-4 py-2 bg-sidebar-accent rounded-t-lg flex flex-row">
                <div className="flex-1 text-sm font-semibold">
                    Concentración de ganancias
                </div>
                <div className="flex flex-row gap-2 items-center">
                    {/*
                     <Settings className="h-4 text-gray-500 cursor-pointer"/>
                    */}
                </div>
            </div>

            <div className="flex-1 p-2">
                <ParetoChart
                    categories={data.categories}
                    cumulativePercentages={data.cumulativePercentages}
                    revenues={data.revenues}
                    initialLoadDelay={150}
                />
            </div>
        </div>
    )
}