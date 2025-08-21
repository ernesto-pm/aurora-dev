import ReactECharts from 'echarts-for-react';
import {ClientOnly} from "remix-utils/client-only";

function getOption() {
    return {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            }
        ]
    }
}

export default function CustomLineChart() {
    return (
        <ClientOnly fallback={<div>Cargando grafica...</div>}>
            {() => (
                <ReactECharts
                    lazyUpdate={true}
                    option={getOption()}
                    style={{"width": "100%", 'height': '100%'}}
                />
            )}
        </ClientOnly>
    )
}