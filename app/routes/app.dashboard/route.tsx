import { SidebarInset } from "~/components/ui/sidebar";
import AppHeader from "~/routes/app/AppHeader";
import type {LoaderFunctionArgs, MetaFunction} from "@remix-run/cloudflare";
import DashboardGrid from "~/routes/app.dashboard/DashboardGrid";

export const meta: MetaFunction = () => {
    return [
        { title: "Aurora | Centro de Control" }
    ]
}

export default function Dashboard() {
    return (
        <SidebarInset>
            <AppHeader headerTitle="Centro de Control"/>
            <div className="flex flex-1 flex-col gap-4 px-4 py-2">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="py-4 px-6 flex flex-col gap-5">
                        <DashboardGrid/>
                    </div>
                </div>
            </div>
        </SidebarInset>
    )
}

