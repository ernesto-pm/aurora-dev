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
                return <div>No widget available...</div>
        }
    }

    return (
        <div className="flex flex-col items-center">
            <div className="w-[450px]">
                {renderWidget()}
            </div>
        </div>
    )
}