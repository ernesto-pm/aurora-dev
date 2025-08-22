import ReactECharts from 'echarts-for-react';
import {ClientOnly} from "remix-utils/client-only";
import {useEffect, useState} from "react";

function getOption() {
    return {
        grid: { // Add this to remove extra padding
            left: '2%',
            right: '2%',
            bottom: '0',
            top: '5%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Sept', 'Oct', 'Nov', 'Dic'],
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
            type: 'value',
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
        series: [
            {
                data: [150, 230, 224, 218, 135, 147, 150, 230, 224, 218, 135, 147],
                type: 'line',
                smooth: true,
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
            }
        ],
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderColor: '#e2e8f0',
            borderWidth: 1,
            textStyle: {
                color: '#1e293b'
            },
            formatter: function (params) {
                return `
                <div style="font-weight: bold; margin-bottom: 4px;">${params[0].axisValue}</div>
                <div>
                    <span style="display: inline-block; width: 10px; height: 10px; background: #3b82f6; border-radius: 50%; margin-right: 8px;"></span>
                    Valor: ${params[0].value}
                </div>
            `;
            }
        }
    }
}

export default function LineChart() {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setIsMounted(true)
        }, 300)
    }, [])

    if (!isMounted) return <div>Loading...</div>

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