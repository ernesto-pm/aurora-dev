import {SidebarInset} from "~/components/ui/sidebar";
import AppHeader from "~/routes/app/AppHeader";
import {Input} from "~/components/ui/input";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { Form, FormControl, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import {z} from "zod"
import {Button} from "~/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "~/components/ui/select";

const FormSchema = z.object({
    businessName: z.string().nonempty({error: "Campo requerido"}),
    industry: z.string().nonempty({error: "Campo requerido"}),
    country: z.string().nonempty({error: "Campo requerido"}),
    city: z.string().nonempty({error: "Campo requerido"})
})

export default function RegistroDeNegocio() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            businessName: "",
            industry: "",
            country: "",
            city: ""
        }
    })

    async function handleSubmit(values: z.infer<typeof FormSchema>) {
        console.log(values)
    }


    return (
        <SidebarInset>
            <AppHeader headerTitle="Registro de negocio"/>

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
                                    name="industry"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Industria:</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                La industria de tu negocio, por ejemplo: Restaurantes, Comida, Tienda en linea, etc.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="country"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Pais:</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecciona un país de la lista" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="México">México</SelectItem>
                                                    <SelectItem value="Estados Unidos">Estados Unidos</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormDescription>
                                                El pais en donde esta localizado tú negocio.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Ciudad:</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                La ciudad donde esta localizado tu negocio.
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