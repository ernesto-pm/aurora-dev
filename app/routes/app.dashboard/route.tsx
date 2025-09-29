import AppNavigationHeader from "~/routes/app/AppNavigationHeader";
import type {MetaFunction} from "@remix-run/cloudflare";
import DashboardGrid from "~/routes/app.dashboard/DashboardGrid";
import DashboardGridLayout from "./DashboardGridLayout";
import ChatUI from "~/routes/app.chat.$id/ChatUI";
import ChatMessageInput from "~/routes/app.chat.$id/ChatMessageInput";

export const meta: MetaFunction = () => {
    return [
        { title: "Aurora | Centro de Control" }
    ]
}

export default function Dashboard() {
    return (
        <div className="flex flex-col h-full w-full">
            <AppNavigationHeader headerTitle="Centro de Control" />
            <DashboardGridLayout />
        </div>
    )
}