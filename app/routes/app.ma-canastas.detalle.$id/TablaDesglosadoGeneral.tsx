import React, { useMemo } from "react"
import { useAtomValue } from "jotai"
import { shopifyOrdersAtom } from "~/routes/app.ma-canastas.detalle.$id/state"
import {
    useReactTable,
    getCoreRowModel,
    getGroupedRowModel,
    getExpandedRowModel,
    flexRender,
    createColumnHelper,
    ExpandedState,
    GroupingState, Cell, Row,
} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"
import {ChevronDown, ChevronRight} from "lucide-react";

// Helper to format currency
export const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
    }).format(value || 0)
}

// Helper to format date
const formatDate = (dateString) => {
    if (!dateString) return ""
    return new Intl.DateTimeFormat("es-MX", {
        timeZone: "America/Mexico_City",
        dateStyle: "long",
        timeStyle: "short",
    }).format(new Date(dateString))
}

export default function TablaDesglosadoGeneral() {
    const shopifyOrders = useAtomValue(shopifyOrdersAtom)

    // 1. Flatten the data: Transform Orders -> LineItems into a flat list of rows
    const data = useMemo(() => {
        return shopifyOrders.flatMap((order) => {
            return order.augmentedLineItems.map((item) => ({
                // Hierarchy Identifiers
                orderId: order.id,
                orderName: order.name, // This will be our grouping key
                orderTags: order.tags.join(", "),
                orderCreatedAt: order.createdAt,

                // Item Details
                itemId: item.originalLineItem.id,
                itemName: item.originalLineItem.title,
                productName: item.productName,
                presentation: item.presentation,
                price: item.price,
                quantity: item.quantity,
                vendor: item.vendor,
                originalPrice: item.originalLineItem.price
            }))
        })
    }, [shopifyOrders])

    // 2. Define Columns
    const columnHelper = createColumnHelper()

    const columns = useMemo(
        () => [
            // Grouping Column
            columnHelper.accessor("orderName", {
                header: "Orden",
                cell: (info) => info.getValue(),
                // Aggregation can be defined here if you want to show something when collapsed
            }),
            columnHelper.accessor("itemName", {
                header: "Nombre Canasta",
            }),
            columnHelper.accessor("productName", {
                header: "Nombre de producto",
            }),
            columnHelper.accessor("presentation", {
                header: "Presentacion",
            }),
            columnHelper.accessor("price", {
                header: "Precio",
                cell: (info) => formatCurrency(info.getValue()),
            }),
            columnHelper.accessor("quantity", {
                header: "Cantidad",
            }),
            columnHelper.accessor("vendor", {
                header: "Productor",
            }),
            columnHelper.accessor("orderTags", {
                header: "Dia",
            }),
            columnHelper.accessor("orderCreatedAt", {
                header: "Fecha de creacion",
                cell: (info) => formatDate(info.getValue()),
            }),
        ],
        []
    )

    // 3. Initialize Table
    const table = useReactTable({
        data,
        columns,
        state: {
            // No need to manage state manually if we rely on initial state,
            // but we can pass it here if we want to control it.
        },
        initialState: {
            grouping: ["orderName", "itemName"], // Group by Order Name by default
            expanded: true, // Expand all groups by default
        },
        getCoreRowModel: getCoreRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
    })

    return (
        <div className="flex flex-col flex-wrap gap-5 px-3 py-2">
            <div className="text-2xl font-semibold">Desglosado general</div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : (
                                            <div>
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {/* Add grouping toggle UI here if you want interactive grouping in the future */}
                                            </div>
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => {
                                return (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                        {row.getVisibleCells().map((cell) => {
                                            return (
                                                <TableCell
                                                    key={cell.id}
                                                    style={{
                                                        // Indent grouped cells for visual hierarchy if needed
                                                        background: row.getIsGrouped() ? "#f9fafb" : "transparent",
                                                        fontWeight: row.getIsGrouped() ? "bold" : "normal",
                                                    }}
                                                >
                                                    <InnerConditionalTableCell cell={cell} row={row}/>
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                )
                            })
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

interface InnerConditionalTableCellProptypes {
    cell: Cell<unknown, unknown>
    row: Row<unknown>
}
function InnerConditionalTableCell({ cell, row }: InnerConditionalTableCellProptypes){

    // A. Handle Grouped Cells (The expanders)
    if (cell.getIsGrouped()) {
        return (
            <div className="flex items-center gap-2">
                <button
                    onClick={row.getToggleExpandedHandler()}
                    style={{ cursor: "pointer" }}
                >
                    {row.getIsExpanded() ? (
                        <ChevronDown className="inline" />
                    ) : (
                        <ChevronRight className="inline" />
                    )}
                    {' '}
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </button>
            </div>
        );
    }

    // B. Handle Aggregated Cells (Summary data)
    if (cell.getIsAggregated()) {

        if (cell.column.id == "price") {
            //console.log("ayyo precio")
            //const firstRowData = row.getLeafRows()[0].original;
            //console.log(firstRowData)

            return (
                <span>

                </span>
            );

        }



        return flexRender(
            cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell,
            cell.getContext()
        );
    }

    // C. Handle Placeholders (Empty space in grouped rows)
    if (cell.getIsPlaceholder()) {
        return null;
    }

    // D. Default (Standard Cells)
    return flexRender(cell.column.columnDef.cell, cell.getContext());
}