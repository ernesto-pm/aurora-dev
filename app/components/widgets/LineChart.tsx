import ReactECharts from 'echarts-for-react';
import {ClientOnly} from "remix-utils/client-only";
import {useEffect, useState} from "react";
import {CallbackDataParams} from "echarts/types/dist/shared";


interface LineChartPropTypes {
    horizontalAxisValues: string[] | number[]
    horizontalAxisLabel: string
    horizontalAxisType: 'value' | 'category' | 'time'
    verticalAxisValues: string[] | number[]
    verticalAxisLabel: string
    verticalAxisType: 'value' | 'category' | 'time'
}

export default function LineChart({horizontalAxisValues, verticalAxisValues, horizontalAxisLabel, verticalAxisLabel, horizontalAxisType, verticalAxisType}: LineChartPropTypes) {
    /*
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setIsMounted(true)
        }, 0)
    }, [])

    if (!isMounted) return <div>Cargando...</div>
     */

    function shapeData() {
        /* Transforms the data into this:  source: [
                {month: 'Jan', value: 100},
                {month: 'Feb', value: 300},
                {month: 'March', value: 400}
            ]
         */
        // Check if both columns and values are the same size
        if (horizontalAxisValues.length !== verticalAxisValues.length) {
            throw new Error("Error, columns and values must be the same length")
        }

        const source = []
        for (let i= 0; i < horizontalAxisValues.length; i++) {
            source.push({
                [horizontalAxisLabel]: horizontalAxisValues[i],
                [verticalAxisLabel]: verticalAxisValues[i]
            })
        }

        console.log(source)

        return source
    }

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
                source: shapeData()
                //dimensions: ['month', 'value'],
                /*
                source: [
                    {month: 'Jan', value: 100},
                    {month: 'Feb', value: 300},
                    {month: 'March', value: 400}
                ]
                 */
            },
            xAxis: {
                type: horizontalAxisType,
                //type: 'category',
                //data: ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Sept', 'Oct', 'Nov', 'Dic'],
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
            series: [
                {
                    //data: [150, 230, 224, 218, 135, 147, 150, 230, 224, 218, 135, 147],
                    type: 'line',
                    encode: {
                        x: horizontalAxisLabel,
                        y: verticalAxisLabel,
                        //x: 'month',
                        //y: 'value'
                    },
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
                    markLine: {
                        data: [
                            {
                                type: 'average',
                                name: 'promedio'
                            }
                        ]
                    }
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
                formatter: function (params: CallbackDataParams[]) {
                    console.log(params[0])
                    return `
                        <div style="font-weight: bold; margin-bottom: 4px;">
                            ${horizontalAxisLabel}: ${params[0].axisValueLabel || 'N/A'}
                        </div>
                        <div>
                            <span style="display: inline-block; width: 10px; height: 10px; background: #3b82f6; border-radius: 50%; margin-right: 8px;"></span>
                            ${verticalAxisLabel}: ${params[0].value[verticalAxisLabel] || 'N/A'}
                        </div>
                    `
                }
            },
            /*
            dataZoom: [
                {
                    type: 'slider',
                    xAxisIndex: 'all',
                    left: '10%',
                    right: '10%',
                    bottom: 0,
                    height: 30,
                    throttle: 120
                },
                {
                    type: 'inside',
                    xAxisIndex: 'all',
                    throttle: 120
                }
            ]
             */
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