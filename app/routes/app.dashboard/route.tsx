import AppNavigationHeader from "~/routes/app/AppNavigationHeader";
import type {MetaFunction} from "@remix-run/cloudflare";
import DashboardGrid from "~/routes/app.dashboard/DashboardGrid";
import DashboardGridLayout from "./DashboardGridLayout";

export const meta: MetaFunction = () => {
    return [
        { title: "Aurora | Centro de Control" }
    ]
}

export default function Dashboard() {
    return (
        <div>
            <AppNavigationHeader headerTitle="Centro de Control"/>

            <div className="flex flex-1 flex-col gap-4 md:px-4 py-2">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="py-4 md:px-6 flex flex-col gap-5">
                        <DashboardGridLayout />
                    </div>
                </div>
            </div>

        </div>
    )
}

