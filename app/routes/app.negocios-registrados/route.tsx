import { SidebarInset } from "~/components/ui/sidebar";
import AppHeader from "~/routes/app/AppHeader";
import {
    Card,
    CardDescription, CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import {useOutletContext} from "@remix-run/react";
import {useQuery} from "@tanstack/react-query";
import {getBusinessesForSupabaseUserOptions} from "~/services/aurora/@tanstack/react-query.gen";
import type { MetaFunction } from "@remix-run/cloudflare";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "~/components/ui/dialog";
import {Button} from "~/components/ui/button";
import {Input} from "~/components/ui/input";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form";

export const meta: MetaFunction = () => {
    return [
        { title: "Aurora | Negocios Registrados" }
    ];
};

export default function NegociosRegistrados() {
    return (
        <SidebarInset>
            <AppHeader headerTitle="Negocios Registrados"/>
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <BusinessList/>
                </div>
            </div>
        </SidebarInset>
    )
}


const GrantAccessFormSchema = z.object({
    email: z.email("Por favor introduce un email valido").nonempty("Campo requerido")
})

function BusinessList() {
    const {accessToken} = useOutletContext<{accessToken: string}>()
    const form = useForm<z.infer<typeof GrantAccessFormSchema>>({
        resolver: zodResolver(GrantAccessFormSchema),
        defaultValues: {
            email: ""
        },
    })
    const {data, isLoading, isError, error} = useQuery({
        ...getBusinessesForSupabaseUserOptions({
            headers: {
                'Authorization': `bearer ${accessToken}`
            },
            throwOnError: true
        })
    })

    if (isLoading || data === undefined) return <div className="flex flex-row py-4 px-6 space-x-2">Cargando, un momento por favor...</div>
    if (isError) return <div className="flex flex-row py-4 px-6 space-x-2">{error.message}</div>
    if (!data || data.length === 0) return <div className="flex flex-row py-4 px-6 space-x-2">No cuentas con ningún negocio agregado aún.</div>

    async function onSubmit(values: z.infer<typeof GrantAccessFormSchema>) {
        console.log(values)
    }


    return (
        <div className="flex flex-row py-4 px-6 gap-x-2 gap-y-5 flex-wrap justify-around">
            {
                data.map((business) => {
                    return (
                        <Card key={business.id} className="min-w-[300px]">
                            <CardHeader>
                                <CardTitle>{business.name}</CardTitle>
                                <CardDescription>{business.created_at}</CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <Dialog>
                                    <DialogTrigger>
                                        <Button>
                                            Otorgar acceso a Usuario
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Otorgar Acceso</DialogTitle>
                                            <DialogDescription>
                                                Introduce el e-mail de la persona a la cual deseas otorgarle acceso a tu negocio.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <Form {...form}>
                                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                                {/* Email */}
                                                <div className="grid gap-2">
                                                    <FormField
                                                        control={form.control}
                                                        name="email"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>e-mail:</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="e-mail del usuario..." {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <Button disabled={form.formState.isSubmitting}>
                                                        Otorgar Acceso
                                                    </Button>
                                                </div>
                                            </form>
                                        </Form>
                                    </DialogContent>
                                </Dialog>
                            </CardFooter>
                        </Card>
                    )
                })
            }
        </div>
    )
}