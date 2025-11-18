import {AuroraMiscMaBasketsOrderSummary} from "~/services/aurora";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "~/components/ui/table";
import {ExternalLinkIcon} from "lucide-react";
import {useNavigate} from "@remix-run/react";

interface OrderSummaryListProptypes {
    summaries: AuroraMiscMaBasketsOrderSummary[]
}

export default function OrderSummaryList({summaries}: OrderSummaryListProptypes) {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col gap-5">
            <div className="text-2xl font-semibold">
                Resumenes creados
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Fecha de inicio</TableHead>
                        <TableHead>Fecha fin</TableHead>
                        <TableHead>Detalle</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        summaries.map(
                            (summary) => {
                                const formattedFromDate = new Intl.DateTimeFormat('es-MX', {
                                    timeZone: 'America/Mexico_City',
                                    dateStyle: 'long',
                                    timeStyle: 'short'
                                }).format(new Date(summary.from_date))

                                const formattedToDate = new Intl.DateTimeFormat('es-MX', {
                                    timeZone: 'America/Mexico_City',
                                    dateStyle: 'long',
                                    timeStyle: 'short'
                                }).format(new Date(summary.to_date))


                                return (
                                    <TableRow key={summary.id}>
                                        <TableCell>{formattedFromDate}</TableCell>
                                        <TableCell>{formattedToDate}</TableCell>
                                        <TableCell>
                                            <ExternalLinkIcon
                                                className="h-5 cursor-pointer"
                                                onClick={() => {navigate(`/app/ma-canastas/detalle/${summary.id}`)}}
                                            />
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