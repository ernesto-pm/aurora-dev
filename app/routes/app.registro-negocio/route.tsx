import {SidebarInset} from "~/components/ui/sidebar";
import AppHeader from "~/routes/app/AppHeader";
import {Input} from "~/components/ui/input";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import {z} from "zod"
import {Button} from "~/components/ui/button";

const FormSchema = z.object({
    businessName: z.string().nonempty(),
    businessDescription: z.string().optional()
})

export default function RegistroDeNegocio() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            businessName: "",
            businessDescription: ""
        }
    })

    async function handleSubmit(values: z.infer<typeof FormSchema>) {
        console.log(values)
    }


    return (
        <SidebarInset>
            <AppHeader headerTitle="Registra tu negocio."/>

            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col py-4 px-6">

                        {/* Header */}
                        <div className="flex flex-col space-y-1.5">
                            <div className="font-semibold leading-none tracking-tight">
                                Registra tu negocio con Aurora A.I.
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Por favor, proporciona la siguiente informacion para poder registrar tu negocio.
                            </div>
                        </div>

                        {/* Form content */}
                        <Form {...form}>
                            <form className="flex flex-col space-y-1.5 mt-6 gap-y-2" onSubmit={form.handleSubmit(handleSubmit)}>

                                <FormField
                                    control={form.control}
                                    name="businessName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nombre:</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Este es el nombre de tú negocio.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="businessName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Industria:</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                La industria de tu negocio, por ejemplo: Restaurantes, Comida, Tienda en linea, etc
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit">
                                    Submit
                                </Button>
                            </form>
                        </Form>

                    </div>
                </div>
            </div>
        </SidebarInset>
    )
}