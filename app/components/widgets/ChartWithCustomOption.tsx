import ReactECharts from 'echarts-for-react';
import {ClientOnly} from "remix-utils/client-only";
import {useEffect, useState} from "react";

interface ChartWithCustomOptionProptypes {
    option: Record<string, object>
    initialLoadDelay: number
}

export default function ChartWithCustomOption({option, initialLoadDelay}: ChartWithCustomOptionProptypes) {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setIsMounted(true)
        }, initialLoadDelay)
    }, [initialLoadDelay])

    if (!isMounted) return <div></div>

    return (
        <ClientOnly fallback={<div>Cargando grafica...</div>}>
            {() => (
                <ReactECharts
                    lazyUpdate={true}
                    option={option}
                    style={{"width": "100%", 'height': '100%'}}
                />
            )}
        </ClientOnly>
    )
}