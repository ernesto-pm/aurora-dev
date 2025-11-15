import {Popover, PopoverContent, PopoverTrigger} from "~/components/ui/popover";
import {Button} from "~/components/ui/button";
import {CalendarIcon} from "lucide-react";
import {format} from "date-fns";
import {Calendar} from "~/components/ui/calendar";
import {useState} from "react";
import {DateRange} from "react-day-picker";
import {createNewBasketOrderSummary} from "~/services/aurora";


export default function OrderSummary() {
    const [dateRange, setDateRange] = useState<DateRange | undefined>()
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit() {
        if (!dateRange) return
        if (!dateRange.from || !dateRange.to) throw new Error("Error, a range must be selected")

        await createNewBasketOrderSummary({
            body: {
                fromDay: dateRange.from.getDate(),
                fromMonth: dateRange.from.getMonth(),
                fromYear: dateRange.from.getFullYear(),
                toDay: dateRange.to.getDate(),
                toMonth: dateRange.to.getMonth(),
                toYear: dateRange.to.getFullYear()
            }
        })
    }

    return (
        <div className="flex flex-col gap-5">
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
                            timeZone="America/Mexico_City"
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