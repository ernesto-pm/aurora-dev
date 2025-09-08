import {useQuery} from "@tanstack/react-query";
import {getTotalSalesPerProductAndVariantsOptions} from "~/services/aurora/@tanstack/react-query.gen";
import {
    ColumnDef,
    GroupingState,
    useReactTable,
    getGroupedRowModel,
    getExpandedRowModel,
    getCoreRowModel, getPaginationRowModel, getFilteredRowModel, flexRender, SortingState, getSortedRowModel
} from "@tanstack/react-table";
import { PocGetTotalSalesPerProductAndVariantsRow } from "~/services/aurora";
import {useMemo, useState} from "react"
import {ChevronDown, ChevronRight, MoreHorizontal, Users, X} from "lucide-react";

interface BestSellingVariantsGroupedByProductWidgetProptypes {
    dashboardId: string
}

export default function BestSellingVariantsGroupedByProductWidget(props: BestSellingVariantsGroupedByProductWidgetProptypes) {
    const {data, isError, error, isLoading} = useQuery({
        ...getTotalSalesPerProductAndVariantsOptions({
            body: {
                dashboardId: props.dashboardId,
                orderState: 'sale'
            },
            throwOnError: true
        })
    })

    if (isLoading || data === undefined) return <div>Cargando...</div>
    if (isError) return <div>{error.message}</div>
    if (!data) return <div>No hay datos para este widget</div>

    console.log(data)


    return (
        <div className="col-span-8 row-span-4 rounded-lg bg-sidebar flex flex-col gap-2 shadow-md min-h-[250px] max-h-[500px]">
            <div className="px-4 py-2 bg-sidebar-accent rounded-t-lg flex flex-row">
                <div className="flex-1 text-sm font-semibold">
                    Productos mas vendidos (agrupados)
                </div>
                <div className="flex flex-row gap-2 items-center">
                    {/*
                     <Settings className="h-4 text-gray-500 cursor-pointer"/>
                    */}
                </div>
            </div>

            <div className="flex-1 p-2 overflow-y-auto">
                <DataTable data={data}/>
            </div>
        </div>
    )
}


interface DataTablePropTypes {
    data: PocGetTotalSalesPerProductAndVariantsRow[];
}

function DataTable({ data }: DataTablePropTypes) {
    const columns = useMemo<ColumnDef<PocGetTotalSalesPerProductAndVariantsRow>[]>(
        () => [
            {
                accessorKey: 'product_name',
                header: 'Producto',
                getGroupingValue: row => `${row.product_name}`,
            },
            {
                accessorKey: 'sum_quantity',
                header: 'Cantidad',
                getGroupingValue: row => `${row.sum_quantity}`,
            },
            {
                accessorKey: 'variant_name',
                header: 'Variante',
                getGroupingValue: row => `${row.variant_name}`,
            }
        ],
        []
    );

    const [grouping, setGrouping] = useState<GroupingState>(['product_name']);

    const table = useReactTable({
        data,
        columns,
        state: {
            grouping,
        },
        initialState: {
            sorting: [
                {
                    id: 'sum_quantity',
                    desc: true
                }
            ]
        },
        onGroupingChange: setGrouping,
        getExpandedRowModel: getExpandedRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        //getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(), // Add this line!
        getFilteredRowModel: getFilteredRowModel(),
        debugTable: false,
    });

    console.log(table.getState().sorting)

    return (
        <div className="w-full">

            {/* Table */}
            <div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} colSpan={header.colSpan} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {header.isPlaceholder ? null : (
                                        <div className="flex items-center gap-3">
                                            {
                                                /*
                                                // Disable grouping toggle for now...
                                                header.column.getCanGroup() && (
                                                    <button
                                                        onClick={header.column.getToggleGroupingHandler()}
                                                        className="flex items-center justify-center w-6 h-6 rounded-md hover:bg-gray-200 transition-colors"
                                                        title={header.column.getIsGrouped() ? 'Desagrupar' : 'Agrupar'}
                                                    >
                                                        {
                                                            !header.column.getIsGrouped() && <MoreHorizontal className="h-4 w-4 text-gray-400" />
                                                        }
                                                        {
                                                            header.column.getIsGrouped() && <div>X</div>
                                                        }
                                                    </button>
                                                )
                                                 */
                                            }
                                            <span className="font-semibold text-gray-700">
                          {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                          )}
                        </span>
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                    {table.getRowModel().rows.map(row => (
                        <tr
                            key={row.id}
                            className="hover:bg-gray-50 transition-colors duration-150"
                        >
                            {row.getVisibleCells().map(cell => (
                                <td
                                    key={cell.id}
                                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                                        cell.getIsGrouped()
                                            ? 'bg-indigo-50 border-l-4 border-indigo-400 font-medium'
                                            : cell.getIsAggregated()
                                                ? 'bg-rose-50 border-l-4 border-rose-400'
                                                : cell.getIsPlaceholder()
                                                    ? 'bg-gray-50'
                                                    : 'text-gray-900'
                                    }`}
                                >
                                    {cell.getIsGrouped() ? (
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={row.getToggleExpandedHandler()}
                                                disabled={!row.getCanExpand()}
                                                className="flex items-center justify-center w-6 h-6 rounded-md hover:bg-green-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {row.getIsExpanded() ? (
                                                    <ChevronDown className="h-4 w-4 text-violet-600" />
                                                ) : (
                                                    <ChevronRight className="h-4 w-4 text-violet-600" />
                                                )}
                                            </button>
                                            <div className="flex-1">
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </div>
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {row.subRows.length}
                        </span>
                                        </div>
                                    ) : cell.getIsAggregated() ? (
                                        flexRender(
                                            cell.column.columnDef.aggregatedCell ??
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )
                                    ) : cell.getIsPlaceholder() ? (
                                        <div className="h-5" />
                                    ) : (
                                        flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}