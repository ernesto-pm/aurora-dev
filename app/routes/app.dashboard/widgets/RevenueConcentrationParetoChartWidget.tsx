import {useQuery} from "@tanstack/react-query";
import {getRevenueConcentrationOptions} from "~/services/aurora/@tanstack/react-query.gen";
import ParetoChart from "~/components/widgets/ParetoChart";
import {upsertWidgetAssistanceChat} from "~/services/aurora";
import {useNavigate} from "@remix-run/react";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarLabel,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger
} from "~/components/ui/menubar";
import {Bot} from "lucide-react";

interface RevenueConcentrationParetoChartWidgetProptypes {
    dashboardId: string
}

export default function RevenueConcentrationParetoChartWidget(props: RevenueConcentrationParetoChartWidgetProptypes) {
    const {data, isError, error, isLoading} = useQuery({
        ...getRevenueConcentrationOptions({
            body: {
                dashboardId: props.dashboardId
            },
            throwOnError: true
        })
    })
    const navigate = useNavigate()

    if (isLoading || data === undefined) return <div>Cargando...</div>
    if (isError) return <div>{error.message}</div>
    if (!data) return <div>No hay datos para este widget</div>

    async function createWidgetAssistanceChat(optionalUserMessage?: string) {
        const {data} = await upsertWidgetAssistanceChat({
            body: {
                dashboardId: props.dashboardId,
                dashboardWidgetUniqueIdentifier: 'revenueConcentration'
            },
            throwOnError: true
        })

        if (!data) {
            throw new Error("Error, no data was provided")
        }

        if (optionalUserMessage) {
            navigate(`/app/widget-assistance-chat/${data.id}?newUserMessage=${optionalUserMessage}`)
        } else {
            navigate(`/app/widget-assistance-chat/${data.id}`)
        }
    }

    return (
        <div className="rounded-lg bg-sidebar flex flex-col gap-2 shadow-md h-full w-full">
            <div className="px-4 py-2 bg-sidebar-accent rounded-t-lg flex flex-row">
                <div className="flex-1 text-sm font-semibold">
                    Concentración de ganancias
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <Menubar>
                        <MenubarMenu>
                            <MenubarTrigger className="p-0">
                                <Bot className="text-purple-700 h-5 cursor-pointer"/>
                            </MenubarTrigger>
                            <MenubarContent>
                                <MenubarLabel className="text-muted-foreground">Pregúntale a Aurora</MenubarLabel>

                                <MenubarItem onClick={() => createWidgetAssistanceChat("Explicame esta gráfica")}>
                                    Explicame esta gráfica
                                </MenubarItem>

                                <MenubarItem onClick={() => createWidgetAssistanceChat("¿Qué producto genera más ingresos?")}>
                                    ¿Qué producto genera más ingresos?
                                </MenubarItem>

                                <MenubarItem onClick={() => createWidgetAssistanceChat("¿Qué producto genera menos ingresos?")}>
                                    ¿Qué producto genera menos ingresos?
                                </MenubarItem>

                                <MenubarSeparator />

                                <MenubarItem onClick={() => createWidgetAssistanceChat()}>
                                    O escríbele tu pregunta...
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                </div>
            </div>

            <div className="flex-1 p-2">
                <ParetoChart
                    categories={data.categories}
                    cumulativePercentages={data.cumulativePercentages}
                    revenues={data.revenues}
                    initialLoadDelay={150}
                />
            </div>
        </div>
    )
}