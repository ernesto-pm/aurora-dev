import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {PlusCircle} from "lucide-react";
import {AssociatedProductWithBasketPayload, updateAssociatedProducts} from "~/services/aurora";

type ProductFormData = {
    products: AssociatedProductWithBasketPayload[]
};

interface AssociatedProductsFormProptypes {
    basketId: string
    initialAssociatedProducts: AssociatedProductWithBasketPayload[]
}

export default function AssociatedProductsForm({basketId, initialAssociatedProducts}: AssociatedProductsFormProptypes) {
    const { register, control, handleSubmit, reset, formState: { errors, isDirty}} = useForm<ProductFormData>({
        defaultValues: {
            products: initialAssociatedProducts
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "products"
    });

    function addNewProduct() {
        append({
            productName: 'Nuevo producto',
            vendor: '',
            presentation: '',
            quantity: 0,
            price: 0,
            shopifyProductId: '',
            inventoryQuantity: 0
        });
    }

    async function onSubmit(data: ProductFormData){
        // Your submit handler here
        console.log("Form data:", data);
        await updateAssociatedProducts({
            body: {
                basketId: basketId,
                associatedProducts: data.products
            },
            throwOnError: true
        })
        console.log("Success!")

        reset(data)
    }

    return (
        <div className="w-full flex flex-col gap-5">
            <div className="text-lg font-semibold">
                Asociar productos
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Producto</TableHead>
                            <TableHead>Productor</TableHead>
                            <TableHead>Presentación</TableHead>
                            <TableHead>Cantidad en canasta</TableHead>
                            <TableHead>Precio</TableHead>
                            <TableHead>Cantidad en Inventario</TableHead>
                            <TableHead>ID Shopify (Opcional)</TableHead>
                            <TableHead>Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {fields.map((field, index) => (
                            <TableRow key={field.id}>
                                <TableCell>
                                    <Input
                                        {...register(`products.${index}.productName`)}
                                        className="min-w-[150px]"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        {...register(`products.${index}.vendor`)}
                                        className="min-w-[120px]"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        {...register(`products.${index}.presentation`)}
                                        className="min-w-[120px]"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        {...register(`products.${index}.quantity`, { valueAsNumber: true })}
                                        className="min-w-[100px]"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        {...register(`products.${index}.price`, { valueAsNumber: true })}
                                        className="min-w-[100px]"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        {...register(`products.${index}.inventoryQuantity`, { valueAsNumber: true })}
                                        className="min-w-[100px]"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        {...register(`products.${index}.shopifyProductId`)}
                                        className="min-w-[120px]"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => remove(index)}
                                    >
                                        Eliminar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className="flex gap-3 mt-4">
                    <Button type="button" variant="outline" onClick={addNewProduct}>
                        Agregar nuevo producto <PlusCircle/>
                    </Button>

                    {
                        isDirty
                        &&
                        <Button type="submit">
                            Guardar cambios
                        </Button>
                    }
                </div>
            </form>
        </div>
    )
}