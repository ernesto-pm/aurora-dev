import {useQuery} from "@tanstack/react-query";
import {
    getTotalItemsForProductsWithoutVariantsOptions
} from "~/services/aurora/@tanstack/react-query.gen";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"


interface TotalsForProductsWithoutVariantsPropTypes {
    dashboardId: string
}

export default function TotalsForProductsWithoutVariants(props: TotalsForProductsWithoutVariantsPropTypes) {
    const {data, isError, error, isLoading} = useQuery({
        ...getTotalItemsForProductsWithoutVariantsOptions({
            body: {
                dashboardId: props.dashboardId,
                orderState: 'sale',
                limit: 20
            },
            throwOnError: true
        })
    })

    if (isLoading || data === undefined) return <div>Cargando...</div>
    if (isError) return <div>{error.message}</div>
    if (!data) return <div>No hay datos para este widget</div>


    return (
        <div className="rounded-lg bg-sidebar flex flex-col gap-2 shadow-md w-full h-full">
            <div className="px-4 py-2 bg-sidebar-accent rounded-t-lg flex flex-row">
                <div className="flex-1 text-sm font-semibold">
                    Total de productos (sin variantes) mas vendidos
                </div>
                <div className="flex flex-row gap-2 items-center">
                    {/*
                     <Settings className="h-4 text-gray-500 cursor-pointer"/>
                    */}
                </div>
            </div>

            <div className="flex-1 p-2 overflow-y-auto">
                <Table>
                    <TableCaption>Desglose del total de productos vendidos en <span className="font-semibold">todas</span> las ordenes.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead></TableHead>
                            <TableHead>Nombre del producto</TableHead>
                            <TableHead className="w-[100px] text-center">Porcentaje</TableHead>
                            <TableHead className="w-[100px] text-center">Cantidad</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            data.map(
                                (item, index) => (
                                    <TableRow key={item.product_id}>
                                        <TableCell className="text-muted-foreground">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {item.product_name}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {item.percentage_of_total}%
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {item.total_sales}
                                        </TableCell>
                                    </TableRow>
                                )
                            )
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}