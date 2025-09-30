import {useQuery, useQueryClient} from "@tanstack/react-query";
import {
    getAllMaOrdersSummariesOptions,
    getAllMaOrdersSummariesQueryKey
} from "~/services/aurora-data-server/@tanstack/react-query.gen";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"
import {useState} from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/components/ui/popover"
import { Button } from "~/components/ui/button";
import { format } from "date-fns"
import {CalendarIcon} from "lucide-react";
import {Calendar} from "~/components/ui/calendar";
import {DateRange} from "react-day-picker";
import {Separator} from "~/components/ui/separator";
import {createWeeklyOrderSummary, getOrderSummaryFileLink} from "~/services/aurora-data-server";

export default function MAWeeklyOrderSummaryApp(){
    return (
        <div className="w-full h-full flex flex-col gap-5">
            <PreviousWeeklyOrderSummaries />
            <Separator/>
            <CreateNewWeeklyOrderSummary />
        </div>
    )
}

function CreateNewWeeklyOrderSummary() {
    const [dateRange, setDateRange] = useState<DateRange | undefined>()
    const [isLoading, setIsLoading] = useState(false)
    const queryClient = useQueryClient()

    async function handleSubmit() {
        try {
            setIsLoading(true)
            const newSummary = await createWeeklyOrderSummary({
                body: {
                    startDate: dateRange!.from!.toISOString(),
                    endDate: dateRange!.to!.toISOString()
                },
                throwOnError: true
            })
            console.log(newSummary)
            setIsLoading(false)
            await queryClient.invalidateQueries({
                queryKey: getAllMaOrdersSummariesQueryKey()
            })
        } catch (e) {
            alert("Error...")
        }
    }

    return (
        <div className="flex flex-col gap-5">

            <div className="text-lg font-semibold">
                Crear nuevo registro de ventas
            </div>

            <div className="flex flex-col gap-3">
                <div className="text-muted-foreground text-md">
                    Selecciona el rango de fechas que deseas para tu resumen:
                </div>
                <Popover>
                    <PopoverTrigger asChild disabled={isLoading}>
                        <Button
                            variant="outline"
                            data-empty={!dateRange}
                            className="data-[empty=true]:text-muted-foreground w-[500px] justify-start text-left font-normal"
                            disabled={isLoading}
                        >
                            <CalendarIcon />
                            {(dateRange?.from && dateRange.to) ? `${format(dateRange.from, "PPP")} -> ${format(dateRange.to, "PPP")}` : <span>Selecciona el rango de fechas</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="range"
                            selected={dateRange}
                            onSelect={setDateRange}
                            required={true}
                            disabled={isLoading}
                        />
                    </PopoverContent>
                </Popover>
            </div>


            <div>
                <Button
                    disabled={isLoading || !dateRange}
                    onClick={handleSubmit}
                >
                    Crear
                </Button>
            </div>

        </div>
    )
}


function PreviousWeeklyOrderSummaries() {
    const {data, isLoading, isError, error} = useQuery({
        ...getAllMaOrdersSummariesOptions({}),
        throwOnError: true
    })

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>{error.message}</div>
    if (!data) return (
        <div className="flex flex-col gap-3">
            <div className="text-lg font-semibold">
                Registro de ventas pasadas
            </div>
            <div className="text-muted-foreground">
                No se encontraron resumenes aun...
            </div>
        </div>
    )

    async function handleGenerateLink(summaryId: string) {
        try {
            const {data} = await getOrderSummaryFileLink({
                body: {
                    summaryId: summaryId
                },
                throwOnError: true
            })

            window.open(data, '_blank')
        } catch (e) {
            alert("Error generando link")
        }
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="text-lg font-semibold">
                Registro de ventas pasadas
            </div>
            <Table>
                <TableCaption>Lista de resumenes previos de ventas semanales.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Desde</TableHead>
                        <TableHead>Hasta</TableHead>
                        <TableHead>Link</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data.map(
                            (entry) => {
                                const localizedFromDate = new Date(entry.from_date).toLocaleDateString('es-MX', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })
                                const localizedToDate = new Date(entry.to_date).toLocaleDateString('es-MX', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })

                                return (
                                    <TableRow key={entry.id}>
                                        <TableCell>{localizedFromDate}</TableCell>
                                        <TableCell>{localizedToDate}</TableCell>
                                        <TableCell>
                                            <button
                                                onClick={() => handleGenerateLink(entry.id)}
                                                className="text-blue-600 underline"
                                            >
                                                Descargar archivo...
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        )
                    }
                </TableBody>
            </Table>
        </div>

    )
}