import {useAtomValue} from "jotai";
import {ordersAndAddressesAtom, shopifyOrdersAtom} from "~/routes/app.ma-canastas.detalle.$id/state";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"
import {Button} from "~/components/ui/button";

export default function TablaOrdenesYDirecciones() {
    const ordersAndAddresses = useAtomValue(ordersAndAddressesAtom)

    async function downloadCSV() {
        const Papa = (await import("papaparse")).default

        const csv = Papa.unparse(ordersAndAddresses);
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'ordenesYDirecciones.csv';
        link.click();
        window.URL.revokeObjectURL(url);
    }

    return (
        <div className="flex flex-col flex-wrap gap-5 px-3 py-2">
            <div className="text-2xl font-semibold">
                Ordenes y direcciones
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Orden</TableHead>
                        <TableHead>Nombre cliente</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead># Canastas Toronjil</TableHead>
                        <TableHead># Canastas Nochebuena</TableHead>
                        <TableHead># Canastas Cosmos</TableHead>
                        <TableHead># Total de canastas</TableHead>
                        <TableHead>Numero</TableHead>
                        <TableHead>Direccion 1</TableHead>
                        <TableHead>Direccion 2</TableHead>
                        <TableHead>Ciudad</TableHead>
                        <TableHead>Pais</TableHead>
                        <TableHead>Dia</TableHead>
                        <TableHead>Notas</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Fecha de creacion</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        ordersAndAddresses.map(
                            (order, i) => {
                                return (
                                    <TableRow key={i}>
                                        <TableCell>{order['Orden']}</TableCell>
                                        <TableCell>{order['Nombre Cliente']}</TableCell>
                                        <TableCell>{order['e-mail']}</TableCell>
                                        <TableCell>{order['Total Toronjil']}</TableCell>
                                        <TableCell>{order['Total Nochebuena']}</TableCell>
                                        <TableCell>{order['Total Cosmos']}</TableCell>
                                        <TableCell>{order['Total de canastas']}</TableCell>
                                        <TableCell>{order['Telefono']}</TableCell>
                                        <TableCell>{order['Direccion 1']}</TableCell>
                                        <TableCell>{order['Direccion 2']}</TableCell>
                                        <TableCell>{order['Ciudad']}</TableCell>
                                        <TableCell>{order['Pais']}</TableCell>
                                        <TableCell>{order['Dia']}</TableCell>
                                        <TableCell>{order['Notas']}</TableCell>
                                        <TableCell>{order['Company']}</TableCell>
                                        <TableCell>{order['Fecha de creacion']}</TableCell>
                                    </TableRow>
                                )
                            }
                        )
                    }
                </TableBody>
            </Table>

            <div>
                <Button onClick={downloadCSV}>
                    Descargar archivo
                </Button>
            </div>
        </div>

    )
}