import {useAtomValue} from "jotai";
import {productTotalsAtom} from "~/routes/app.ma-canastas.detalle.$id/state";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "~/components/ui/table";
import {formatCurrency} from "~/routes/app.ma-canastas.detalle.$id/TablaDesglosadoGeneral";

export default function TablaTotalesPorProducto() {
    const totalsForBasket = useAtomValue(productTotalsAtom)

    return (
        <div className="flex flex-col flex-wrap gap-5 px-3 py-2">
            <div className="text-2xl font-semibold">
                Total de productos para esta semana
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre de producto</TableHead>
                        <TableHead>Presentacion</TableHead>
                        <TableHead>Productor</TableHead>
                        <TableHead>Costo Individual</TableHead>
                        <TableHead>Cantidad</TableHead>
                        <TableHead>Costo Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        totalsForBasket.map(
                            (totals, i) => {
                                return (
                                    <TableRow key={i}>
                                        <TableCell>{totals.productName}</TableCell>
                                        <TableCell>{totals.presentation}</TableCell>
                                        <TableCell>{totals.vendor}</TableCell>
                                        <TableCell>{formatCurrency(totals.price)}</TableCell>
                                        <TableCell>{totals.count}</TableCell>
                                        <TableCell>{formatCurrency(totals.totalCost)}</TableCell>
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