import type {LoaderFunctionArgs} from "@remix-run/cloudflare";
import {getBasketWithId, getShopifyProducts} from "~/services/aurora";
import {useLoaderData} from "@remix-run/react";
import {useHydrateAtoms} from "jotai/utils";
import {
    associatedProductsAtom,
    allShopifyProductsAtom,
    associatedProductIdsAtom
} from "~/routes/app.ma-canastas.editar-canasta.$id/state";
import ShopifyProductList from "~/routes/app.ma-canastas.editar-canasta.$id/ShopifyProductList";
import AssociatedProducts from "~/routes/app.ma-canastas.editar-canasta.$id/AssociatedProducts";

export async function loader({params}: LoaderFunctionArgs) {
    if (!params.id) {
        throw new Error("Error, proporciona el ID de la canasta")
    }

    const {data: getBasketWithIdResponse} = await getBasketWithId({
        path: {
            id: params.id
        },
        throwOnError: true
    })
    if (!getBasketWithIdResponse) throw new Error("Error al obtener informacion sobre canasta")

    const {data: shopifyProductsData} = await getShopifyProducts({
        body: {
            vendorFilter: "Mercado Tlalpan",
            productTitleFilter: "canasta"
        },
        throwOnError: true
    })
    if (!shopifyProductsData) throw new Error("Error, no shopify products found")

    return {
        basket: getBasketWithIdResponse.basket,
        associatedProducts: getBasketWithIdResponse.associatedProducts,
        shopifyProducts: shopifyProductsData
    }
}

export default function EditarCanasta() {
    const {basket, associatedProducts, shopifyProducts} = useLoaderData<typeof loader>()
    useHydrateAtoms([[associatedProductIdsAtom, associatedProducts.map(product => product.shopify_product_id)]])
    useHydrateAtoms([[allShopifyProductsAtom, shopifyProducts]])

    return (
        <div className="p-5 flex flex-col w-full h-full gap-5 overflow-y-auto">
            <div className="text-2xl font-semibold">
                {basket.name}
            </div>

            <AssociatedProducts basketId={basket.id}/>
            <ShopifyProductList/>
        </div>
    )
}