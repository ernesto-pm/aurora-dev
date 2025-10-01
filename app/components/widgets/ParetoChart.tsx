import ReactECharts from 'echarts-for-react';
import {ClientOnly} from "remix-utils/client-only";
import {useEffect, useState} from "react";

export default function ParetoChart({revenues, cumulativePercentages, categories, initialLoadDelay}) {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setIsMounted(true)
        }, initialLoadDelay)
    }, [initialLoadDelay])

    if (!isMounted) return <div></div>

    function getOption() {
        return {
            grid: {
                left: '2%',
                right: '1%',
                bottom: 0,
                top: '5%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: categories,
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
            yAxis: [
                {
                    type: 'value',
                    name: 'Revenue',
                    position: 'left',
                    axisLabel: {
                        formatter: '${value}',
                        color: '#64748b'
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#e2e8f0',
                            type: 'dashed'
                        }
                    }
                },
                {
                    type: 'value',
                    name: 'Cumulative %',
                    position: 'right',
                    min: 0,
                    max: 100,
                    axisLabel: {
                        formatter: '{value}%',
                        color: '#64748b'
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#e2e8f0',
                            type: 'dashed'
                        }
                    }
                }
            ],
            series: [
                {
                    name: 'Ganancias',
                    type: 'bar',
                    smooth: true,
                    data: revenues,
                    yAxisIndex: 0,
                    lineStyle: {
                        width: 4,
                        color: {
                            type: 'linear',
                            x: 0, y: 0, x2: 1, y2: 0,
                            colorStops: [{
                                offset: 0, color: '#3b82f6'
                            }, {
                                offset: 0.5, color: '#8b5cf6'
                            }, {
                                offset: 1, color: '#ec4899'
                            }]
                        }
                    },
                    itemStyle: {
                        color: {
                            type: 'linear',
                            x: 0, y: 0, x2: 0, y2: 1,
                            colorStops: [{
                                offset: 0, color: '#3b82f6'
                            }, {
                                offset: 0.5, color: '#8b5cf6'
                            }, {
                                offset: 1, color: '#ec4899'
                            }]
                        }
                    },
                    emphasis: {
                        itemStyle: {
                            color: '#3b82f6',
                            borderColor: '#ffffff',
                            borderWidth: 2,
                            shadowColor: 'rgba(59, 130, 246, 0.5)',
                            shadowBlur: 15,
                            symbolSize: 12
                        }
                    },
                },
                {
                    name: '% Acumulado',
                    type: 'line',
                    data: cumulativePercentages,
                    yAxisIndex: 1,  // Secondary y-axis for percentage
                    lineStyle: { color: '#ff6b6b', width: 2 }
                }
            ],
            tooltip: {}
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