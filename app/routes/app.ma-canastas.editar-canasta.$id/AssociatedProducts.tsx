import {useAtom, useAtomValue, useSetAtom} from "jotai";
import {associatedProductIdsAtom, associatedProductsAtom} from "~/routes/app.ma-canastas.editar-canasta.$id/state";
import {ShopifyProduct} from "~/services/aurora";
import {Button} from "~/components/ui/button";
import {SquareXIcon} from "lucide-react";

interface AssociatedProductsProtypes {
    basketId: string
}

export default function AssociatedProducts({basketId}: AssociatedProductsProtypes) {
    const [associatedProducts, setAssociatedProducts] = useAtom(associatedProductsAtom)
    const associatedProductIds = useAtomValue(associatedProductIdsAtom)

    async function handleSubmit() {
        try {
            /*
            await editAssociatedProducts({
                body: {
                    basketId: basketId,
                    shopifyProductIds: associatedProductIds
                },
                throwOnError: true
            })

             */

            alert("Exito, canasta ha sido actualizada")
        } catch (e) {
            alert("Error al guardar los cambios")
            console.error(e)
        }
    }


    return (
        <div className="flex flex-col gap-5 p-5 rounded-xl border-2 border-black/20">
            <div className="text-lg font-semibold">
                Productos asociados con esta canasta:
            </div>
            <div className="flex flex-row gap-2 flex-wrap">
                {
                    associatedProducts.map(
                        (p) => <AssociatedProductBadge key={p.id} product={p}/>
                    )
                }
            </div>
            <div>
                <Button variant="outline" onClick={handleSubmit}>
                    Guardar cambios
                </Button>
            </div>
        </div>
    )
}

interface AssociatedProductBadgeProptypes {
    product: ShopifyProduct
}
function AssociatedProductBadge({product}: AssociatedProductBadgeProptypes) {
    const setAssociatedProductIds = useSetAtom(associatedProductIdsAtom)

    function handleDeletion() {
        setAssociatedProductIds((prev) => prev.filter(id => id !== product.id))
    }

    return (
        <div className="px-3 py-2 bg-blue-400 text-white font-semibold text-xs rounded-md flex flex-row gap-2 items-center">
            <SquareXIcon className="h-5 w-5 text-white cursor-pointer" onClick={handleDeletion}/>

            {product.title}
        </div>
    )
}