import AppNavigationHeader from "~/routes/app/AppNavigationHeader";
import {LoaderFunctionArgs, MetaFunction} from "@remix-run/cloudflare";
import DashboardGridLayout from "./DashboardGridLayout";
import {isRouteErrorResponse, useLoaderData, useRouteError, useSearchParams} from "@remix-run/react";
import {getDashboardsForSupabaseUser} from "~/services/aurora";
import {getSupabaseAccessToken} from "~/services/supabaseServerClientUtils";

export async function loader({request, context}: LoaderFunctionArgs) {
    const accessToken = await getSupabaseAccessToken(request, context)

    const {data} = await getDashboardsForSupabaseUser({
        headers: {
            'Authorization': `bearer ${accessToken}`
        },
        throwOnError: true
    })

    if (!data || data.length === 0) {
        throw new Error("Error, no dashboards found for user")
    }

    return {
        dashboards: data,
        selectedDashboardId: data[0].id,
        selectedDashboard: data[0]
    }
}

export function ErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return (
            <div>
                <h1>{error.status} {error.statusText}</h1>
                <p>{error.data?.message}</p>
            </div>
        );
    }

    // Handle unexpected errors
    return (
        <div className="p-5">
            <h1>Hubo un error</h1>
        </div>
    );
}

export const meta: MetaFunction = () => {
    return [
        { title: "Aurora | Centro de Control" }
    ]
}

export default function Dashboard() {
    const [searchParams, setSearchParams] = useSearchParams()
    const isDebug = searchParams.get("debug") === "true"
    const {dashboards, selectedDashboardId, selectedDashboard} = useLoaderData<typeof loader>()


    return (
        <div className="flex flex-col h-full w-full">
            <AppNavigationHeader headerTitle="Centro de Control" />
            <DashboardGridLayout
                debugModeEnabled={isDebug}
                dashboards={dashboards}
                selectedDashboard={selectedDashboard}
                selectedDashboardId={selectedDashboardId}
            />
        </div>
    )
}