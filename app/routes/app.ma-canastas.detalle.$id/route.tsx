import type {LoaderFunctionArgs} from "@remix-run/cloudflare";
import {getOrderSummaryWithId} from "~/services/aurora";
import {useLoaderData} from "@remix-run/react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"

export async function loader({params}: LoaderFunctionArgs) {
    if (!params.id) throw new Error("Error, proporciona el ID de la canasta")

    const {data} = await getOrderSummaryWithId({
        path: {
            id: params.id
        },
        throwOnError: true
    })

    if (!data) throw new Error("Error when getting data")

    return {
        summary: data
    }
}

export default function DetalleMaCanastas() {
    const {summary} = useLoaderData<typeof loader>()

    return (
        <div className="flex flex-wrap gap-5 px-10 py-5 overflow-y-auto">
            <div className="text-xl font-semibold">
                Desglosado de articulos para ordenes
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Orden</TableHead>
                        <TableHead>Nombre Canasta</TableHead>
                        <TableHead>Nombre de producto</TableHead>
                        <TableHead>Presentacion</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Cantidad</TableHead>
                        <TableHead>Productor</TableHead>
                        <TableHead>Fecha de creacion</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        summary.map(
                            (order) => {

                                const formattedCreatedAt = new Intl.DateTimeFormat('es-MX', {
                                    timeZone: 'America/Mexico_City',
                                    dateStyle: 'long',
                                    timeStyle: 'short'
                                }).format(new Date(order.createdAt))

                                return order.lineItems.map(
                                    (lineItem) => (
                                        <TableRow key={lineItem.originalLineItem.id}>
                                            <TableCell>{order.name}</TableCell>
                                            <TableCell>{lineItem.basketName}</TableCell>
                                            <TableCell>{lineItem.productName}</TableCell>
                                            <TableCell>{lineItem.presentation}</TableCell>
                                            <TableCell>{lineItem.price}</TableCell>
                                            <TableCell>{lineItem.quantity}</TableCell>
                                            <TableCell>{lineItem.vendor}</TableCell>
                                            <TableCell>{formattedCreatedAt}</TableCell>
                                        </TableRow>
                                    )
                                )
                            }
                        )
                    }
                </TableBody>
            </Table>
        </div>

    )
}

/*

 {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                        <TableCell className="font-medium">{invoice.invoice}</TableCell>
                        <TableCell>{invoice.paymentStatus}</TableCell>
                        <TableCell>{invoice.paymentMethod}</TableCell>
                        <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                    </TableRow>
                ))}
 */