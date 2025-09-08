import ReactECharts from 'echarts-for-react';
import {ClientOnly} from "remix-utils/client-only";

interface LineChartDatasetPropTypes {
    horizontalAxisLabel: string
    horizontalAxisType: 'value' | 'category' | 'time'
    verticalAxisLabel: string
    verticalAxisType: 'value' | 'category' | 'time',
    dimensions: string[]
    source: string[]
    seriesIds: string[]
}

export default function LineChartDataset({dimensions, source, seriesIds, horizontalAxisLabel, verticalAxisLabel, horizontalAxisType, verticalAxisType}: LineChartDatasetPropTypes) {
    function getOption() {
        return {
            grid: { // Add this to remove extra padding
                left: '2%',
                right: '1%',
                bottom: 0,
                top: '5%',
                containLabel: true
            },
            dataset: {
                source: source,
                dimensions: dimensions
            },
            xAxis: {
                type: horizontalAxisType,
                axisLine: {
                    lineStyle: {
                        color: '#cbd5e1'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: '#475569',
                    fontSize: 12,
                    fontWeight: '500'
                }
            },

            yAxis: {
                type: verticalAxisType,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: '#64748b',
                    fontSize: 11
                },
                splitLine: {
                    lineStyle: {
                        color: '#e2e8f0',
                        type: 'dashed'
                    }
                }
            },
            series: seriesIds.map(seriesId => ({
                name: `${seriesId}`,
                type: 'bar',
                encode: {
                    x: 'product_source_id',
                    y: `variant_${seriesId}`
                }
            })),
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderColor: '#e2e8f0',
                borderWidth: 1,
                textStyle: {
                    color: '#1e293b'
                },
            }
        }
    }

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