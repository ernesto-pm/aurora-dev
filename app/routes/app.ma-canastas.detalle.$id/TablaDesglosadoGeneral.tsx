import {useAtomValue} from "jotai";
import {shopifyOrdersAtom} from "~/routes/app.ma-canastas.detalle.$id/state";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"

export default function TablaDesglosadoGeneral() {
    const shopifyOrders = useAtomValue(shopifyOrdersAtom)

    return (
        <div className="flex flex-col flex-wrap gap-5 px-3 py-2">
            <div className="text-2xl font-semibold">
                Desglosado general
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
                        <TableHead>Dia</TableHead>
                        <TableHead>Fecha de creacion</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        shopifyOrders.map(
                            (order) => {

                                const formattedCreatedAt = new Intl.DateTimeFormat('es-MX', {
                                    timeZone: 'America/Mexico_City',
                                    dateStyle: 'long',
                                    timeStyle: 'short'
                                }).format(new Date(order.createdAt))

                                return order.augmentedLineItems.map(
                                    (augmentedLineItem) => (
                                        <TableRow key={augmentedLineItem.originalLineItem.id}>
                                            <TableCell>{order.name}</TableCell>
                                            <TableCell>{augmentedLineItem.originalLineItem.title}</TableCell>
                                            <TableCell>{augmentedLineItem.productName}</TableCell>
                                            <TableCell>{augmentedLineItem.presentation}</TableCell>
                                            <TableCell>{augmentedLineItem.price}</TableCell>
                                            <TableCell>{augmentedLineItem.quantity}</TableCell>
                                            <TableCell>{augmentedLineItem.vendor}</TableCell>
                                            <TableCell>{order.tags.join(", ")}</TableCell>
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