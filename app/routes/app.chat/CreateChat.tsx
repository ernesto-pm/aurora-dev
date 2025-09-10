import {useQuery} from "@tanstack/react-query";
import {
    getBusinessesDataConnectionsForSupabaseUserOptions
} from "~/services/aurora/@tanstack/react-query.gen";
import {useOutletContext} from "@remix-run/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "~/components/ui/dialog";
import {Button} from "~/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form";
import {Input} from "~/components/ui/input";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {MessageCircle} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "~/components/ui/select";
import {createChat} from "~/services/aurora";


const CreateChatFormSchema = z.object({
    composedBusinessDataSourceId: z.string().nonempty(),
    displayName: z.string().optional()
})

interface CreateChatPropTypes {}
export default function CreateChat(props: CreateChatPropTypes) {
    const {accessToken} = useOutletContext<{accessToken: string}>()

    const {data, isLoading, isError, error} = useQuery({
        ...getBusinessesDataConnectionsForSupabaseUserOptions({
            headers: {
                'Authorization': `bearer ${accessToken}`
            },
            throwOnError: true
        })
    })

    const form = useForm<z.infer<typeof CreateChatFormSchema>>({
        resolver: zodResolver(CreateChatFormSchema),
        defaultValues: {
            composedBusinessDataSourceId: "",
            displayName: ""
        },
    })

    async function onSubmit(values: z.infer<typeof CreateChatFormSchema>) {
        const [businessId, businessDataSourceId] = values.composedBusinessDataSourceId.split(";")

        try {
            const newChat = await createChat({
                body: {
                    businessId: businessId,
                    businessDataSourceId: businessDataSourceId,
                    displayName: values.displayName ?? ""
                },
                throwOnError: true
            })

            console.log(newChat)
        } catch (e) {
            alert("Ha ocurrido un error al crear el chat, por favor intentalo de nuevo...")
        }
    }

    if (isLoading || data===undefined) return <div>Cargando datos...</div>
    if (isError) return <div>{error.message}</div>
    if (!data || data.length === 0) return <div>No hay informacion disponible...</div>


    return (
        <Dialog>
            <DialogTrigger>
                <Button className="bg-teal-600 hover:bg-teal-700">
                    <MessageCircle/> Iniciar una nueva conversación
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Inicia una nueva conversación</DialogTitle>
                    <DialogDescription>
                        Selecciona el negocio y conexión de datos para comenzar, si aún no cuentas con una conexión de datos, <a href="mailto:ernesto@get-aurora.ai" className="text-blue-600 underline">contáctanos</a>.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">

                        <FormField
                            control={form.control}
                            name="composedBusinessDataSourceId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Score</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleciona tu conexión de datos"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                data.map(
                                                    (connectionAndBusiness) => {
                                                        const value = `${connectionAndBusiness.business_id};${connectionAndBusiness.connection_id}`
                                                        const displayValue = `${connectionAndBusiness.business_name} - ${connectionAndBusiness.data_source_display_name}`

                                                        return (
                                                            <SelectItem key={value} value={value} className="whitespace-normal break-words pr-2">
                                                                {displayValue}
                                                            </SelectItem>
                                                        )
                                                    }
                                                )
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="displayName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Dale un nombre a esta conversación (Opcional):</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button disabled={form.formState.isSubmitting}>
                            Iniciar Conversación
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}