import { SidebarInset } from "~/components/ui/sidebar";
import AppNavigationHeader from "~/routes/app/AppNavigationHeader";
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
import {AuroraBusiness, grantAccessForSupabaseUserEmail} from "~/services/aurora";

export const meta: MetaFunction = () => {
    return [
        { title: "Aurora | Negocios Registrados" }
    ];
};

export default function NegociosRegistrados() {
    return (
        <div>
            <AppNavigationHeader headerTitle="Negocios Registrados"/>
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <BusinessList/>
                </div>
            </div>
        </div>
    )
}

function BusinessList() {
    const {accessToken} = useOutletContext<{accessToken: string}>()

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

    return (
        <div className="flex flex-row py-4 px-6 gap-x-2 gap-y-5 flex-wrap">
            {
                data.map((business) => <BusinessListCard key={business.id} business={business} />)
            }
        </div>
    )
}

const GrantAccessFormSchema = z.object({
    email: z.email("Por favor introduce un email valido").nonempty("Campo requerido")
})
interface BusinessListCardProptypes {
    business: AuroraBusiness
}
function BusinessListCard(props: BusinessListCardProptypes) {
    const form = useForm<z.infer<typeof GrantAccessFormSchema>>({
        resolver: zodResolver(GrantAccessFormSchema),
        defaultValues: {
            email: ""
        },
    })

    async function onSubmit(values: z.infer<typeof GrantAccessFormSchema>) {
        const {data, error} = await grantAccessForSupabaseUserEmail({
            body: {
                businessId: props.business.id,
                supabaseUserEmail: values.email
            }
        })

        if (error || !data) {
            alert("Ha ocurrido un error al otorgar acceso")
            return
        }

        alert("Exito!")
        form.reset()
    }

    return (
        <Card className="min-w-[300px]">
            <CardHeader>
                <CardTitle>{props.business.name}</CardTitle>
                <CardDescription className="tex-sm">
                    Creado el {new Date(props.business.created_at).toLocaleString()}
                </CardDescription>
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
                                Antes de otorgar el acceso, asegurate que el e-mail tiene una cuenta creada en Aurora.
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
}