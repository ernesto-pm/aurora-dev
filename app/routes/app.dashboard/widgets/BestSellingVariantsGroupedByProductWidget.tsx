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
    data: PocGetTotalSalesPerProductAndVariantsRow[]
}

function DataTable({data}: DataTablePropTypes) {
    const columns = useMemo<ColumnDef<PocGetTotalSalesPerProductAndVariantsRow>[]>(
        () => [
            {
                header: "Cantidad",
                columns: [
                    {
                        accessorKey: 'sum_quantity',
                        header: 'Cantidad',
                        cell: info => info.getValue(),
                        getGroupingValue: row => `${row.sum_quantity}`
                    }
                ]
            },
            {
                header: "Producto",
                columns: [
                    {
                        accessorKey: 'product_name',
                        header: 'Producto',
                        cell: info => info.getValue(),
                        getGroupingValue: row => `${row.product_name}`
                    }
                ]
            },
            {
                header: "Variante",
                columns: [
                    {
                        accessorKey: 'variant_name',
                        header: 'Variante',
                        cell: info => info.getValue(),
                        getGroupingValue: row => `${row.variant_name}`
                    }
                ]
            }
        ],
        []
    )
    const [grouping, setGrouping] = useState<GroupingState>([])

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
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        debugTable: true,
    })


    return (
        <div className="p-2">
            <div className="h-2" />
            <table>
                <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => {
                            return (
                                <th key={header.id} colSpan={header.colSpan}>
                                    {header.isPlaceholder ? null : (
                                        <div>
                                            {header.column.getCanGroup() ? (
                                                // If the header can be grouped, let's add a toggle
                                                <button
                                                    {...{
                                                        onClick: header.column.getToggleGroupingHandler(),
                                                        style: {
                                                            cursor: 'pointer',
                                                        },
                                                    }}
                                                >
                                                    {header.column.getIsGrouped()
                                                        ? `🛑(${header.column.getGroupedIndex()}) `
                                                        : `👊 `}
                                                </button>
                                            ) : null}{' '}
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </div>
                                    )}
                                </th>
                            )
                        })}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map(row => {
                    return (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => {
                                return (
                                    <td
                                        {...{
                                            key: cell.id,
                                            style: {
                                                background: cell.getIsGrouped()
                                                    ? '#0aff0082'
                                                    : cell.getIsAggregated()
                                                        ? '#ffa50078'
                                                        : cell.getIsPlaceholder()
                                                            ? '#ff000042'
                                                            : 'white',
                                            },
                                        }}
                                    >
                                        {cell.getIsGrouped() ? (
                                            // If it's a grouped cell, add an expander and row count
                                            <>
                                                <button
                                                    {...{
                                                        onClick: row.getToggleExpandedHandler(),
                                                        style: {
                                                            cursor: row.getCanExpand()
                                                                ? 'pointer'
                                                                : 'normal',
                                                        },
                                                    }}
                                                >
                                                    {row.getIsExpanded() ? '👇' : '👉'}{' '}
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}{' '}
                                                    ({row.subRows.length})
                                                </button>
                                            </>
                                        ) : cell.getIsAggregated() ? (
                                            // If the cell is aggregated, use the Aggregated
                                            // renderer for cell
                                            flexRender(
                                                cell.column.columnDef.aggregatedCell ??
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )
                                        ) : cell.getIsPlaceholder() ? null : ( // For cells with repeated values, render null
                                            // Otherwise, just render the regular cell
                                            flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )
                                        )}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <div className="h-2" />
            <div className="flex items-center gap-2">
                <button
                    className="border rounded p-1"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<<'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {'>'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    {'>>'}
                </button>
                <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
          </strong>
        </span>
                <span className="flex items-center gap-1">
          | Go to page:
          <input
              type="number"
              min="1"
              max={table.getPageCount()}
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  table.setPageIndex(page)
              }}
              className="border p-1 rounded w-16"
          />
        </span>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        table.setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            <div>{table.getRowModel().rows.length} Rows</div>
            <pre>{JSON.stringify(grouping, null, 2)}</pre>
        </div>
    )
}