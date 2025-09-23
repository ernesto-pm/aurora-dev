import AssistantSelectorList from "~/routes/app.chat.new/AssistantSelectorList";
import AuroraPlanSelectorList from "~/routes/app.chat.new/AuroraPlanSelectorList";
import DataConnectionSelector from "~/routes/app.chat.new/DataConnectionSelector";
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form";
import {useForm} from "react-hook-form";
import z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {createChat} from "~/services/aurora";
import {useNavigate} from "@remix-run/react";

const NewFormSchema = z.object({
    composedBusinessDataSourceId: z.string().nonempty(),
    assistantId: z.string().nonempty("Selecciona el asistente que deseas utilizar"),
    llmModelId: z.string().nonempty(),
    displayName: z.string().optional()
})

export default function NewChatForm() {
    const form = useForm<z.infer<typeof NewFormSchema>>({
        resolver: zodResolver(NewFormSchema),
        defaultValues: {
            composedBusinessDataSourceId: "",
            assistantId: "",
            llmModelId: "",
            displayName: ""
        },
    })
    const navigate = useNavigate()

    async function onSubmit(values: z.infer<typeof NewFormSchema>) {
        console.log(values)
        const [businessId, businessDataSourceId] = values.composedBusinessDataSourceId.split(";")

        try {
            const newChat = await createChat({
                body: {
                    businessId: businessId,
                    businessDataSourceId: businessDataSourceId,
                    assistantId: values.assistantId,
                    llmModelId: values.llmModelId,
                    displayName: values.displayName ?? ""
                },
                throwOnError: true
            })

            if (!newChat.data) throw new Error("No new chat data...")

            navigate(`/app/chat/${newChat.data?.id}`)
        } catch (e) {
            alert("Ha ocurrido un error al crear el chat, por favor intentalo de nuevo...")
        }
    }

    return (
        <Form {...form}>
            <div className="flex-1 flex flex-col h-full">
                {/* Scrollable form content */}
                <div className="flex-1 overflow-y-auto lg:px-10 lg:py-5 px-5 py-2">
                    <div className="flex flex-col gap-5">
                        <FormField
                            control={form.control}
                            name="assistantId"
                            render={({ field }) => (
                                <FormItem>
                                    <AssistantSelectorList
                                        selectedValue={field.value}
                                        onValueChange={field.onChange}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="llmModelId"
                            render={({ field }) => (
                                <FormItem>
                                    <AuroraPlanSelectorList
                                        selectedValue={field.value}
                                        onValueChange={field.onChange}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="composedBusinessDataSourceId"
                            render={({ field }) => (
                                <FormItem>
                                    <DataConnectionSelector
                                        selectedValue={field.value}
                                        onValueChange={field.onChange}
                                    />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="displayName"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex flex-col gap-2">
                                        <FormLabel className="font-semibold">
                                            Dale un nombre a tu conversacion (Opcional):
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder=""
                                                autoComplete="off"
                                                data-1p-ignore
                                                {...field}
                                            />
                                        </FormControl>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* Fixed submit button area */}
                <div className="shrink-0 border-t bg-background p-4 lg:px-10">
                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        onClick={form.handleSubmit(onSubmit)}
                        className="w-full"
                    >
                        Crear Conversacion
                    </Button>
                </div>
            </div>
        </Form>
    )
}