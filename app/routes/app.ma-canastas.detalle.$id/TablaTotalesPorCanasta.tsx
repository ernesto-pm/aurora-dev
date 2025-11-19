import {useAtomValue} from "jotai";
import {basketTotalsAtom} from "~/routes/app.ma-canastas.detalle.$id/state";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "~/components/ui/table";

export default function TablaTotalesPorCanasta() {
    const totalsForBasket = useAtomValue(basketTotalsAtom)

    return (
        <div className="flex flex-col flex-wrap gap-5">
            <div className="text-2xl font-semibold">
                Total de canastas para esta semana
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre Canasta</TableHead>
                        <TableHead>Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        totalsForBasket.map(
                            (totals, i) => {
                                return (
                                    <TableRow key={i}>
                                        <TableCell>{totals.basketName}</TableCell>
                                        <TableCell>{totals.count}</TableCell>
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