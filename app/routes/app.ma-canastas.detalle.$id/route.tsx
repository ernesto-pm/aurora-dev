import type {LoaderFunctionArgs} from "@remix-run/cloudflare";
import {getOrderSummaryWithId} from "~/services/aurora";
import {useLoaderData} from "@remix-run/react";

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

    return (
        <div>
            {
                summary.map(order => (
                    <div>
                        {order.name} - {order.createdAt}
                        <div>
                            {order.lineItems.map(
                                (lineItem) => (
                                    <div>
                                        {lineItem.basketName} - {lineItem.productName} - {lineItem.vendor}
                                        <div>
                                            {JSON.stringify(lineItem.originalLineItem)}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}