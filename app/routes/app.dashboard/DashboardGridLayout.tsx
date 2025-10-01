import {useEffect, useState} from "react";
import {Label} from "~/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "~/components/ui/select";
import "react-grid-layout/css/styles.css"
import { Responsive, WidthProvider } from "react-grid-layout";
import SalesPerMonthWidget from "~/routes/app.dashboard/widgets/SalesPerMonthWidget";
import OrderRevenuePerMonthWidget from "~/routes/app.dashboard/widgets/OrderRevenuePerMonthWidget";
import TotalsForProductsWithoutVariants from "~/routes/app.dashboard/widgets/TotalsForProductsWithoutVariants";
import TotalsForVariants from "~/routes/app.dashboard/widgets/TotalsForVariants";
import TotalsForProductsAndVariants from "~/routes/app.dashboard/widgets/TotalsForProductsAndVariants";
import {Button} from "~/components/ui/button";
import {GetAllDashboardsForSupabaseUserIdRow, updateDashboardLayout} from "~/services/aurora";
import RevenueConcentrationParetoChartWidget
    from "~/routes/app.dashboard/widgets/RevenueConcentrationParetoChartWidget";
import OrderVelocityWidget from "~/routes/app.dashboard/widgets/OrderVelocityWidget";

interface DashboardGridLayoutProptypes {
    debugModeEnabled: boolean
    dashboards: GetAllDashboardsForSupabaseUserIdRow[]
    selectedDashboardId: string
    selectedDashboard: GetAllDashboardsForSupabaseUserIdRow
}


export default function DashboardGridLayout(props: DashboardGridLayoutProptypes) {
    const [selectedDashboardId, setSelectedDashboardId] = useState<null | string>(props.selectedDashboardId)
    const [selectedDashboard, setSelectedDashboard] = useState<GetAllDashboardsForSupabaseUserIdRow | undefined>(props.selectedDashboard)

    useEffect(() => {
        if (selectedDashboardId && props.dashboards) {
            const selectedDashboard = props.dashboards.filter((dashboard) => dashboard.id === selectedDashboardId)[0]
            setSelectedDashboard(selectedDashboard)
        }
    }, [selectedDashboardId, props.dashboards])

    function handleDashboardSelectChange(dashboardId: string) {
        setSelectedDashboardId(dashboardId)
    }

    return (
        <div className="flex-1 overflow-y-auto px-10 py-5 flex flex-col gap-7">

            <div className="flex flex-col gap-3 px-2">
                <Label>
                    Selecciona el origen de los datos:
                </Label>
                <Select value={selectedDashboardId ?? ""} onValueChange={handleDashboardSelectChange}>
                    <SelectTrigger className="w-[300px] text-sm">
                        <SelectValue placeholder="Selecciona una conexión de datos" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            props.dashboards.map((dashboard) => (
                                <SelectItem key={dashboard.id} value={dashboard.id} className="text-sm">
                                    {dashboard.business_name} - {dashboard.data_source_display_name}
                                </SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
            </div>


            {
                selectedDashboard
                &&
                <div>
                    <AuroraGridLayout
                        selectedDashboardId={selectedDashboardId}
                        selectedDashboard={selectedDashboard}
                        debugModeEnabled={props.debugModeEnabled}
                    />
                </div>
            }
        </div>
    )
}

const ResponsiveGridLayout = WidthProvider(Responsive);

interface AuroraGridLayoutProptypes {
    selectedDashboardId: string | null
    selectedDashboard: GetAllDashboardsForSupabaseUserIdRow
    debugModeEnabled: boolean
}
function AuroraGridLayout(props: AuroraGridLayoutProptypes) {
    const [isReshapeable, setIsReshapeable] = useState(false)

    // Default layouts for when localStorage is empty
    const defaultLayouts = {
        lg: [
            {i: "1", x: 0, y: 0, w: 6, h: 2},
            {i: "2", x: 6, y: 0, w: 6, h: 2}
        ],
        md: [
            {i: "1", x: 0, y: 0, w: 5, h: 2},
            {i: "2", x: 5, y: 0, w: 5, h: 2}
        ],
        sm: [
            {i: "1", x: 0, y: 0, w: 3, h: 2},
            {i: "2", x: 3, y: 0, w: 3, h: 2}
        ],
        xs: [
            {i: "1", x: 0, y: 0, w: 2, h: 2},
            {i: "2", x: 2, y: 0, w: 2, h: 2}
        ],
        xxs: [
            {i: "1", x: 0, y: 0, w: 2, h: 2},
            {i: "2", x: 0, y: 2, w: 2, h: 2}
        ]
    };
    const [layouts, setLayouts] = useState(defaultLayouts);

    /*
    useEffect(() => {
        // Load layout from localStorage
        const savedLayouts = getLayoutsFromLocalStorage();
        if (Object.keys(savedLayouts).length > 0) {
            setLayouts(savedLayouts);
        }
    }, []);

    function getLayoutsFromLocalStorage() {
        let savedLayouts = {};
        try {
            const item = window.localStorage.getItem("dashboard-layouts");
            if (item) {
                savedLayouts = JSON.parse(item);
            }
        } catch (e) {
            console.error('Error loading layouts from localStorage:', e);
        }
        return savedLayouts;
    }

    function saveLayoutsToLocalStorage(layouts) {
        try {
            window.localStorage.setItem("dashboard-layouts", JSON.stringify(layouts));
            console.log('Layouts saved to localStorage:', layouts);
        } catch (e) {
            console.error('Error saving layouts to localStorage:', e);
        }
    }
     */

    if (!props.selectedDashboardId) return <div></div>

    function onLayoutChange(layout, layouts) {
        // 'layout' is the current layout for the current breakpoint
        // 'layouts' is an object containing layouts for all breakpoints
        // console.log('Current layout:', layout);
        // console.log('All layouts:', layouts);

        setLayouts(layouts);
        // saveLayoutsToLocalStorage(layouts);
    }

    async function syncDashboardLayout() {
        try {
            const {data} = await updateDashboardLayout({
                body: {
                    dashboardId: props.selectedDashboardId!,
                    layout: JSON.stringify(layouts)
                },
                throwOnError: true
            })

            console.log(data)
            alert("Success saving layout!")
        } catch (e) {
            console.error(e)
            alert(`Error happened during updating of layout ${e}`)
        }
    }


    return (
        <div className="flex flex-col gap-5">
            {
                props.debugModeEnabled
                &&
                <div className="flex flex-row gap-2">
                    <Button onClick={() => setIsReshapeable(!isReshapeable)}>
                        {isReshapeable ? "Disable" : "Enable"} Resize and Drag
                    </Button>

                    <Button onClick={syncDashboardLayout}>
                        Sync layout to server
                    </Button>
                </div>
            }

            <ResponsiveGridLayout
                className="layout w-full"
                layouts={props.selectedDashboard.layout as ReactGridLayout.Layouts}
                onLayoutChange={onLayoutChange}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                rowHeight={60}
                isDraggable={isReshapeable}
                isResizable={isReshapeable}
            >
                <div key="1">
                    <SalesPerMonthWidget
                        dashboardId={props.selectedDashboardId}
                    />
                </div>
                <div key="2">
                    <OrderRevenuePerMonthWidget
                        dashboardId={props.selectedDashboardId}
                    />
                </div>
                <div key="3">
                    <TotalsForProductsWithoutVariants
                        dashboardId={props.selectedDashboardId}
                    />
                </div>
                <div key="4">
                    <TotalsForVariants
                        dashboardId={props.selectedDashboardId}
                    />
                </div>
                <div key="5">
                    <TotalsForProductsAndVariants
                        dashboardId={props.selectedDashboardId}
                    />
                </div>
                <div key="6">
                    <RevenueConcentrationParetoChartWidget
                        dashboardId={props.selectedDashboardId}
                    />
                </div>
                <div key="7">
                    <OrderVelocityWidget
                        dashboardId={props.selectedDashboardId}
                    />
                </div>
            </ResponsiveGridLayout>
        </div>
    );
}


/*

  <div className="mb-4 text-sm">
                <details>
                    <summary>Current Layouts (Debug)</summary>
                    <pre className="bg-gray-100 p-2 rounded mt-2 overflow-auto">
                        {JSON.stringify(layouts, null, 2)}
                    </pre>
                </details>
            </div>
 */