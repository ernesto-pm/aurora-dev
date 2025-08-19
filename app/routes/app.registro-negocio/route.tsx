import {SidebarInset} from "~/components/ui/sidebar";
import AppHeader from "~/routes/app/AppHeader";
import {Input} from "~/components/ui/input";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import {z} from "zod"
import {Button} from "~/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "~/components/ui/select";
import {Textarea} from "~/components/ui/textarea";
import {CheckCircle} from "lucide-react";
import type {MetaFunction} from "@remix-run/cloudflare";
import {createBusiness} from "~/services/aurora";
import {useOutletContext} from "@remix-run/react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "~/components/ui/alert-dialog";
import {useAlert} from "~/hooks/useAlert";

export const meta: MetaFunction = () => {
    return [
        { title: "Aurora | Registro de negocio" }
    ];
};

const FormSchema = z.object({
    businessName: z.string().nonempty({error: "Campo requerido"}),
    industry: z.string().nonempty({error: "Campo requerido"}),
    country: z.string().nonempty({error: "Campo requerido"}),
    city: z.string().optional(),
    address: z.string().optional(),
    businessDescription: z.string().nonempty({error: "Campo requerido"}),
    businessGoals: z.string().nonempty({error: "Campo requerido"})
})

export default function RegistroDeNegocio() {
    const {accessToken} = useOutletContext<{accessToken: string}>()
    const alert = useAlert()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            businessName: "",
            industry: "",
            country: "",
            city: "",
            address: "",
            businessDescription: "",
            businessGoals: ""
        }
    })

    async function handleSubmit(values: z.infer<typeof FormSchema>) {
        const response = await createBusiness({
            body: {
                businessName: values.businessName,
                industry: values.industry,
                country: values.country,
                city: values.city,
                address: values.city,
                businessDescription: values.businessDescription,
                businessGoals: values.businessGoals
            },
            headers: {
                'Authorization': `bearer ${accessToken}`
            }
        })

        if (response.error) {
            alert.error(
                'Error',
                'Ocurrió un error al registrar tu negocio.',
                'Continuar'
            )
            return
        }

        console.log(response.data)
        alert.success(
            'Éxito',
            'Tu negocio ha sido registrado en Aurora.',
            'Continuar'
        )
        form.reset()
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
                                    name="businessDescription"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Describe tu negocio:</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    rows={3}
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Describe tu negocio de la mejor manera que puedas, entre mas información proporciones, Aurora funcionará mejor.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="businessGoals"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Objetivos de negocio:</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    rows={3}
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Describe cuales son los objetivos que quieres que Aurora te ayude a lograr en el próximo año, por ejemplo "Me gustaria incrementar mis ventas un 5%".
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
                                            <FormLabel>Ciudad (Opcional):</FormLabel>
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

                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Dirección (Opcional):</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Si tu negocio tiene una locación física, proporcionala aquí.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <div>
                                    <Button
                                        type="submit"
                                        className="bg-indigo-500 hover:bg-indigo-600 text-white"
                                        disabled={form.formState.isSubmitting}
                                    >
                                        <CheckCircle/> Registra tú negocio
                                    </Button>
                                </div>

                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </SidebarInset>
    )
}