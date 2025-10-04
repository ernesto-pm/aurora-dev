import SalesPerMonthWidget from "~/routes/app.dashboard/widgets/SalesPerMonthWidget";
import RevenueConcentrationParetoChartWidget
    from "~/routes/app.dashboard/widgets/RevenueConcentrationParetoChartWidget";

interface WidgetRendererProptypes {
    dashboardId: string
    widgetIdentifier: string
}

export default function WidgetRenderer({widgetIdentifier, dashboardId}: WidgetRendererProptypes) {

    function renderWidget() {
        switch(widgetIdentifier) {
            case "salesPerMonth":
                return <SalesPerMonthWidget dashboardId={dashboardId} />
            case "revenueConcentration":
                return <RevenueConcentrationParetoChartWidget dashboardId={dashboardId} />
            default:
                return (
                    <div className="text-center py-8 text-gray-400">
                        <div className="mb-2">📊</div>
                        <p>Widget no disponible</p>
                        <p className="text-sm mt-1">ID: {widgetIdentifier}</p>
                    </div>
                )
        }
    }

    return (
        <div className="flex flex-col items-center">
            <div className="w-full max-w-[600px]">
                {renderWidget()}
            </div>
        </div>
    )
}