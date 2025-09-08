import {useQuery} from "@tanstack/react-query";
import {getTotalSalesPerProductAndVariantsOptions} from "~/services/aurora/@tanstack/react-query.gen";
import {
    ColumnDef,
    GroupingState,
    useReactTable,
    getGroupedRowModel,
    getExpandedRowModel,
    getCoreRowModel, getPaginationRowModel, getFilteredRowModel, flexRender
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
        <div className="col-span-6 row-span-4 rounded-lg bg-sidebar flex flex-col gap-2 shadow-md min-h-[250px] max-h-[500px]">
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
                header: "Cantidad",
                columns: [
                    {
                        accessorKey: 'sum_quantity',
                        header: 'Cantidad',
                        cell: info => (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {info.getValue() as number}
              </span>
                        ),
                        getGroupingValue: row => `${row.sum_quantity}`,
                    }
                ]
            },
            {
                header: "Producto",
                columns: [
                    {
                        accessorKey: 'product_name',
                        header: 'Producto',
                        cell: info => (
                            <div className="font-medium text-gray-900">
                                {info.getValue() as string}
                            </div>
                        ),
                        getGroupingValue: row => `${row.product_name}`,
                    }
                ]
            },
            {
                header: "Variante",
                columns: [
                    {
                        accessorKey: 'variant_name',
                        header: 'Variante',
                        cell: info => (
                            <div className="text-gray-600">
                                {info.getValue() as string}
                            </div>
                        ),
                        getGroupingValue: row => `${row.variant_name}`,
                    }
                ]
            }
        ],
        []
    );

    const [grouping, setGrouping] = useState<GroupingState>([]);

    const table = useReactTable({
        data,
        columns,
        state: {
            grouping,
        },
        onGroupingChange: setGrouping,
        getExpandedRowModel: getExpandedRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        //getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        debugTable: false,
    });

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
                                            {header.column.getCanGroup() && (
                                                <button
                                                    onClick={header.column.getToggleGroupingHandler()}
                                                    className="flex items-center justify-center w-6 h-6 rounded-md hover:bg-gray-200 transition-colors"
                                                    title={header.column.getIsGrouped() ? 'Desagrupar' : 'Agrupar'}
                                                >
                                                    {header.column.getIsGrouped() ? (
                                                        <span className="flex items-center justify-center w-5 h-5 bg-red-100 text-red-800 rounded-full text-xs font-bold">
                                {header.column.getGroupedIndex()}
                              </span>
                                                    ) : (
                                                        <MoreHorizontal className="h-4 w-4 text-gray-400" />
                                                    )}
                                                </button>
                                            )}
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
                                            ? 'bg-green-50 border-l-4 border-green-400 font-medium'
                                            : cell.getIsAggregated()
                                                ? 'bg-orange-50 border-l-4 border-orange-400'
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
                                                    <ChevronDown className="h-4 w-4 text-green-600" />
                                                ) : (
                                                    <ChevronRight className="h-4 w-4 text-green-600" />
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

            {/* Pagination Controls */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Primera
                    </button>
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        ← Anterior
                    </button>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Siguiente →
                    </button>
                    <button
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Última
                    </button>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>Página</span>
                        <span className="font-semibold text-gray-900">
              {table.getState().pagination.pageIndex + 1} de{' '}
                            {table.getPageCount()}
            </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600">Ir a página:</label>
                        <input
                            type="number"
                            min="1"
                            max={table.getPageCount()}
                            defaultValue={table.getState().pagination.pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                table.setPageIndex(page);
                            }}
                            className="w-16 px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600">Mostrar:</label>
                        <select
                            value={table.getState().pagination.pageSize}
                            onChange={e => {
                                table.setPageSize(Number(e.target.value));
                            }}
                            className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            {[10, 20, 30, 40, 50].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize} filas
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Footer Info */}
            <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                    <span className="font-medium">{table.getRowModel().rows.length}</span>
                    <span>filas mostradas de</span>
                    <span className="font-medium">{data.length}</span>
                    <span>total</span>
                </div>
                {grouping.length > 0 && (
                    <div className="bg-gray-100 px-3 py-1 rounded-md">
            <pre className="text-xs font-mono text-gray-700">
              {JSON.stringify(grouping)}
            </pre>
                    </div>
                )}
            </div>
        </div>
    );
}