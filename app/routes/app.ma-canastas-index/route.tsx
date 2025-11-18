import {getAllBaskets, getAllOrderSummaries} from "~/services/aurora";
import {useLoaderData, useNavigate} from "@remix-run/react";
import {Button} from "~/components/ui/button";
import CreateOrderSummary from "~/routes/app.ma-canastas-index/CreateOrderSummary";
import OrderSummaryList from "~/routes/app.ma-canastas-index/OrderSummaryList";

export async function loader() {
    const {data} = await getAllBaskets({throwOnError: true})
    const {data: orderSummaries} = await getAllOrderSummaries({throwOnError: true})

    if (!data || !orderSummaries) {
        throw new Error("No data was returned")
    }

    return {
        baskets: data,
        orderSummaries: orderSummaries
    }
}

export default function MACanastasIndex() {
    const {baskets, orderSummaries} = useLoaderData<typeof loader>()
    const navigate = useNavigate()

    return (
        <div className="flex flex-col gap-5 p-10">

            <div className="text-2xl font-semibold">
                Canastas registradas
            </div>
            <div className="flex flex-row gap-5">
                {baskets.map((basket) => (
                    <div key={basket.id} className="p-5 border-2 border-black/30 rounded-lg flex flex-col gap-5 w-[200px]">
                        <div className="text-center">
                            {basket.name}
                        </div>
                        <div className="flex justify-center">
                            <Button onClick={() => {navigate(`/app/ma-editar-canasta/${basket.id}`)}}>
                                Editar
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <OrderSummaryList summaries={orderSummaries}/>

            <div>
                <CreateOrderSummary/>
            </div>

        </div>
    )
}