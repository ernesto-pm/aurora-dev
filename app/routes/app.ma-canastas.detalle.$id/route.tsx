import type {LoaderFunctionArgs} from "@remix-run/cloudflare";
import {getOrderSummaryWithId} from "~/services/aurora";
import {useLoaderData} from "@remix-run/react";
import {useHydrateAtoms} from "jotai/utils";
import {shopifyOrdersAtom} from "~/routes/app.ma-canastas.detalle.$id/state";
import TablaDesglosadoGeneral from "~/routes/app.ma-canastas.detalle.$id/TablaDesglosadoGeneral";
import TablaTotalesPorCanasta from "~/routes/app.ma-canastas.detalle.$id/TablaTotalesPorCanasta";
import TablaTotalesPorProducto from "~/routes/app.ma-canastas.detalle.$id/TablaTotalesPorProducto";
import TablaOrdenesYDirecciones from "~/routes/app.ma-canastas.detalle.$id/TablaOrdenesYDirecciones";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "~/components/ui/tabs"

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
    useHydrateAtoms([[shopifyOrdersAtom, summary]])

    return (
        <div className="flex flex-col gap-5 px-10 py-5 overflow-y-auto">
            <Tabs defaultValue="desglosadoGeneral">
                <TabsList>
                    <TabsTrigger value="desglosadoGeneral">Desglosado General</TabsTrigger>
                    <TabsTrigger value="ordenesYDirecciones">Ordenes y direcciones</TabsTrigger>
                    <TabsTrigger value="totalesPorCanasta">Totales por canasta</TabsTrigger>
                    <TabsTrigger value="totalesPorProducto">Totales por producto</TabsTrigger>
                </TabsList>

                <TabsContent value="desglosadoGeneral">
                    <TablaDesglosadoGeneral/>
                </TabsContent>

                <TabsContent value="ordenesYDirecciones">
                    <TablaOrdenesYDirecciones/>
                </TabsContent>

                <TabsContent value="totalesPorCanasta">
                    <TablaTotalesPorCanasta/>
                </TabsContent>

                <TabsContent value="totalesPorProducto">
                    <TablaTotalesPorProducto/>
                </TabsContent>
            </Tabs>
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