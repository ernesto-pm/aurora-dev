import {ShopifyOrder} from "~/services/aurora";
import {atom} from "jotai";

export const shopifyOrdersAtom = atom<ShopifyOrder[]>([])
export const basketTotalsAtom = atom((get) => {
    const shopifyOrders = get(shopifyOrdersAtom)

    const totalBaskets: Record<string, number> = {}
    shopifyOrders.forEach(order => {
        order.lineItems.forEach(lineItem => {
            if (lineItem.title in totalBaskets) {
                totalBaskets[lineItem.title] += 1
            } else {
                totalBaskets[lineItem.title] = 1
            }
        })
    })

    const mappingAsArray = Object.entries(totalBaskets).map(
        ([basketName, count]) => {
            return {
                'basketName': basketName,
                'count': count
            }
        }
    )

    return mappingAsArray
})
export const productTotalsAtom = atom((get) => {
    const shopifyOrders = get(shopifyOrdersAtom)

    const totalItems: Record<string, {
        productName: string
        presentation: string
        count: number
        price: number
        vendor: string
        quantity: number
    }> = {}
    shopifyOrders.forEach(order => {
        order.augmentedLineItems.forEach(lineItem => {
            if (lineItem.productName in totalItems) {
                totalItems[lineItem.productName].count += 1
            } else {
                totalItems[lineItem.productName] = {
                    count: 1,
                    productName: lineItem.productName,
                    presentation: lineItem.presentation,
                    quantity: lineItem.quantity,
                    price: lineItem.price,
                    vendor: lineItem.vendor
                }
            }
        })
    })

    const mappingAsArray = Object.entries(totalItems).map(
        ([productName, product]) => {
            return {
                'productName': productName,
                'count': product.count,
                'presentation': product.presentation,
                'quantity': product.quantity,
                'price': product.price,
                'vendor': product.vendor
            }
        }
    )

    return mappingAsArray
})

