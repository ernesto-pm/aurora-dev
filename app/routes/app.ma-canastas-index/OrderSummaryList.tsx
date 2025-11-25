import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "~/components/ui/table";
import {ExternalLinkIcon, TrashIcon} from "lucide-react";
import {useNavigate} from "@remix-run/react";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getAllOrderSummariesOptions, getAllOrderSummariesQueryKey} from "~/services/aurora/@tanstack/react-query.gen";
import {Button} from "~/components/ui/button";
import {deleteBasketSummaryWithId} from "~/services/aurora";

export default function OrderSummaryList() {
    const {data, isError, isLoading} = useQuery({
        ...getAllOrderSummariesOptions({throwOnError: true})
    })
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    if (isLoading) return <div>Cargando....</div>
    if (isError) return <div>Ha ocurrido un error</div>
    if (!data) return <div>No se han obtenido datos</div>

    async function handleDelete(id: string) {
        await deleteBasketSummaryWithId({
            path: {
                id: id
            },
            throwOnError: true
        })

        await queryClient.invalidateQueries({
            queryKey: getAllOrderSummariesQueryKey()
        })
    }

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
                        <TableHead>Borrar</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data.map(
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
                                        <TableCell>
                                            <Button
                                                variant="destructive"
                                                onClick={() => handleDelete(summary.id)}
                                            >
                                                <TrashIcon/>
                                            </Button>
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