import AppNavigationHeader from "~/routes/app/AppNavigationHeader";
import type {LoaderFunctionArgs, MetaFunction} from "@remix-run/cloudflare";
import MAWeeklyOrderSummaryApp from "~/routes/app.apps.$id/MAWeeklyOrderSummaryApp";
import {useLoaderData} from "@remix-run/react";
import {ComponentType} from "react";

export const meta: MetaFunction = () => {
    return [
        { title: "Aurora | Tus Apps" }
    ]
}

export function loader({params}: LoaderFunctionArgs) {
    if (!params.id) {
        throw new Error("Error, ID must be specified")
    }

    return {
        'appId': params.id
    }
}

interface AppMappingData {
    Component: ComponentType
    displayName: string
}

export default function AppsIndex() {
    const {appId} = useLoaderData<typeof loader>()
    const APP_MAPPING: Record<string, AppMappingData> = {
        "ma-weekly-orders": {
            Component: MAWeeklyOrderSummaryApp,
            displayName: "Resumen de ordenes semanales"
        }
    }
    const mappingDatum = APP_MAPPING[appId]

    if (!mappingDatum.Component) {
        return <div>Error cargando app...</div>
    }

    return (
        <div className="flex flex-col h-full w-full">
            <AppNavigationHeader headerTitle={mappingDatum.displayName} />
            <div className="flex-1 overflow-y-auto px-10 py-5 flex flex-col gap-7">
                <mappingDatum.Component />
            </div>
        </div>
    )
}