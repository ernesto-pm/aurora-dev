import AppNavigationHeader from "~/routes/app/AppNavigationHeader";
import type {MetaFunction} from "@remix-run/cloudflare";
import DashboardGridLayout from "./DashboardGridLayout";
import {useSearchParams} from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [
        { title: "Aurora | Centro de Control" }
    ]
}

export default function Dashboard() {
    const [searchParams, setSearchParams] = useSearchParams()
    const isDebug = searchParams.get("debug") === "true"

    return (
        <div className="flex flex-col h-full w-full">
            <AppNavigationHeader headerTitle="Centro de Control" />
            <DashboardGridLayout
                debugModeEnabled={isDebug}
            />
        </div>
    )
}