import type {LoaderFunctionArgs} from "@remix-run/cloudflare";
import {getBasketWithId} from "~/services/aurora";
import {useLoaderData} from "@remix-run/react";
import AssociatedProductsForm from "~/routes/app.ma-editar-canasta.$id/AssociatedProductsForm";

export async function loader({params}: LoaderFunctionArgs) {
    if (!params.id) throw new Error("Error, proporciona el ID de la canasta")
    const {data: getBasketWithIdResponse} = await getBasketWithId({
        path: {
            id: params.id
        },
        throwOnError: true
    })
    if (!getBasketWithIdResponse) throw new Error("Error al obtener informacion sobre canasta")

    return {
        basket: getBasketWithIdResponse.basket,
        associatedProducts: getBasketWithIdResponse.associatedProducts
    }
}

export default function EditarCanasta() {
    const {basket, associatedProducts} = useLoaderData<typeof loader>()

    return (
        <div className="p-5 flex flex-col w-full h-full gap-5 overflow-y-auto">
            <div className="text-2xl font-semibold">
                Editar: {basket.name}
            </div>

            <AssociatedProductsForm
                basketId={basket.id}
                initialAssociatedProducts={associatedProducts}
            />
        </div>
    )
}