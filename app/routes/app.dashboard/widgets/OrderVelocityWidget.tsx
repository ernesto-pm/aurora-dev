import {useQuery} from "@tanstack/react-query";
import {getOrderVelocityOptions} from "~/services/aurora/@tanstack/react-query.gen";
import ChartWithCustomOption from "~/components/widgets/ChartWithCustomOption";

interface OrderVelocityWidgetProptypes {
    dashboardId: string
}

export default function OrderVelocityWidget(props: OrderVelocityWidgetProptypes) {
    const {data, isError, error, isLoading} = useQuery({
        ...getOrderVelocityOptions({
            body: {
                dashboardId: props.dashboardId
            },
            throwOnError: true
        })
    })

    if (isLoading || data === undefined) return <div>Cargando...</div>
    if (isError) return <div>{error.message}</div>
    if (!data) return <div>No hay datos para este widget</div>

    function getOption() {
        const dates = data!.categories.map(d => new Date(d))

        return {
            grid: {
                left: '2%',
                right: '1%',
                bottom: '5%',
                top: '5%',
            },
            xAxis: {
                type: 'time',
                // Remove the 'data' property for time axis
            },
            yAxis: {
                type: 'value',
                name: 'Orders',
                minInterval: 1
            },
            series: [
                {
                    name: 'Orders per Week',
                    type: 'line',
                    // Pair dates with values: [date, value]
                    data: dates.map((date, i) => [date, data!.orderCounts[i]]),
                    itemStyle: { color: '#4f46e5' },
                    areaStyle: { opacity: 0.2 }
                },
                {
                    name: '4-Week Moving Avg',
                    type: 'line',
                    // Pair dates with values: [date, value]
                    data: dates.map((date, i) => [date, data!.movingAvgs[i]]),
                    itemStyle: { color: '#f59e0b' },
                    lineStyle: {
                        type: 'dashed',
                        width: 2
                    },
                    smooth: true
                }
            ],
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['Orders per Week', '4-Week Moving Avg']
            }
        };
    }

    return (
        <div className="rounded-lg bg-sidebar flex flex-col gap-2 shadow-md h-full w-full">
            <div className="px-4 py-2 bg-sidebar-accent rounded-t-lg flex flex-row">
                <div className="flex-1 text-sm font-semibold">
                    Velocidad de Ordenes
                </div>
                <div className="flex flex-row gap-2 items-center">
                    {/*
                     <Settings className="h-4 text-gray-500 cursor-pointer"/>
                    */}
                </div>
            </div>

            <div className="flex-1 p-2">
                <ChartWithCustomOption
                    option={getOption()}
                    initialLoadDelay={150}
                />
            </div>
        </div>
    )
}