import {ShopifyOrder} from "~/services/aurora";
import {atom} from "jotai";
import {TableCell} from "~/components/ui/table";

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

export const ordersAndAddressesAtom = atom((get) => {
    const shopifyOrders = get(shopifyOrdersAtom)

    const ordersAndAddresses = shopifyOrders.map(order => {
        const formattedCreatedAt = new Intl.DateTimeFormat('es-MX', {
            timeZone: 'America/Mexico_City',
            dateStyle: 'long',
            timeStyle: 'short'
        }).format(new Date(order.createdAt))

        return {
            'Orden': order.name,
            'Nombre Cliente': order.customerName,
            'e-mail': order.customerEmail,
            'Telefono': order.customerPhone,
            'Direccion 1': order.address1,
            'Direccion 2': order.address2,
            'Ciudad': order.city,
            'Pais': order.country,
            'Dia': order.tags.join(", "),
            'Notas': order.note,
            'Company': order.company,
            'Fecha de creacion': formattedCreatedAt
        }
    })

    return ordersAndAddresses
})