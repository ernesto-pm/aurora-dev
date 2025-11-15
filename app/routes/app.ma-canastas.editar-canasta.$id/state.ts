import {ShopifyProduct} from "~/services/aurora";
import {atom} from "jotai";
import Fuse from "fuse.js";

export const allShopifyProductsAtom = atom<ShopifyProduct[]>([])


// associated product ids and derived atom
export const associatedProductIdsAtom = atom<string[]>([])
export const associatedProductsAtom = atom<ShopifyProduct[]>((get) => {
    const associatedIds = get(associatedProductIdsAtom)
    const shopifyProducts = get(allShopifyProductsAtom)

    // we augment the data we want
    const associatedProductsWithInfo: ShopifyProduct[] = []
    associatedIds.forEach(associatedId => {
        const product = shopifyProducts.find((p) => p.id === associatedId)
        if (product) {
            associatedProductsWithInfo.push(product)
        }
    })

    return associatedProductsWithInfo
})


export const unassociatedShopifyProductsAtom = atom<ShopifyProduct[]>((get) => {
    const allProducts = get(allShopifyProductsAtom);
    const associatedProductIds = get(associatedProductIdsAtom);

    const associatedIds = new Set(associatedProductIds);

    return allProducts.filter(
        (product) => !associatedIds.has(product.id)
    )
});

export const productSearchQueryAtom = atom<string>("");


export const searchedUnassociatedProductsAtom = atom<ShopifyProduct[]>((get) => {
    const query = get(productSearchQueryAtom).trim();
    const candidates = get(unassociatedShopifyProductsAtom);

    if (query.length === 0) return candidates;

    const fuse = new Fuse(candidates, {
        // Tune as you like; lower threshold = stricter match
        threshold: 0.35,
        ignoreLocation: true,
        includeScore: false,
        keys: [
            { name: "title", weight: 0.55 },
            { name: "vendor", weight: 0.25 },
            //{ name: "tags", weight: 0.12 },
            //{ name: "handle", weight: 0.08 },
        ],
    });

    return fuse.search(query).map((r) => r.item);
});
