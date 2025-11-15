import {useAtomValue, useSetAtom} from "jotai"
import {
    associatedProductIdsAtom,
    productSearchQueryAtom,
    searchedUnassociatedProductsAtom
} from "~/routes/app.ma-canastas.editar-canasta.$id/state"
import {Button} from "~/components/ui/button";
import {Input} from "~/components/ui/input";
import {ShopifyProduct} from "~/services/aurora";

export default function ShopifyProductList() {
    const shopifyProducts = useAtomValue(searchedUnassociatedProductsAtom)
    const setProductSearchQuery = useSetAtom(productSearchQueryAtom)

    return (
        <div className="flex flex-col gap-5">
            <div>
                <Input
                    onChange={(e) => {
                        e.preventDefault()
                        setProductSearchQuery(e.target.value)
                    }}
                />
            </div>
            <div className="flex flex-row flex-wrap gap-5">
                {
                    shopifyProducts.map(
                        (product, i) => <ShopifyProductComponent product={product} key={i}/>
                    )
                }
            </div>
        </div>
    )
}

interface ShopifyProductProptypes {
    product: ShopifyProduct
}
function ShopifyProductComponent({product}: ShopifyProductProptypes) {
    const setAssociatedProductIds = useSetAtom(associatedProductIdsAtom)

    function handleAssociate() {
        setAssociatedProductIds((prev) => {
            return [...prev, product.id]
        })
    }

    return (
        <div className="p-5 flex flex-col gap-2 max-w-[200px] border-2 border-black/20 rounded-xl">
            <div className="font-semibold text-center">
                {product.title}
            </div>
            <div className="text-xs text-center text-black/50">
                {product.vendor}
            </div>
            <div className="text-xs text-center text-black/50">
                {product.id}
            </div>
            <div className="flex justify-center">
                <Button onClick={handleAssociate}>
                    Asociar
                </Button>
            </div>
        </div>
    )
}