import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form";
import {useForm} from "react-hook-form";
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/button";
import {Textarea} from "~/components/ui/textarea";
import {lettaCreateAssistantTemplate, lettaCreateMemoryBlockTemplate} from "~/services/aurora";

interface FormValues {
    label: string
    systemPrompt: string
    modelName: string
    temperature: number
}

export default function CreateLettaMemoryBlockTemplate() {
    const form = useForm<FormValues>({
        defaultValues: {
            label: "",
            systemPrompt: "",
            modelName: "",
            temperature: 0.6
        },
    })

    async function onSubmit(formData: FormValues) {
        const response = await lettaCreateAssistantTemplate({
            body: {
                label: formData.label,
                modelName: formData.modelName,
                systemPrompt: formData.systemPrompt,
                temperature: formData.temperature
            },
            throwOnError: true
        })

        if (!response.data) {
            throw new Error("No response from server")
        }

        alert(`Success, assistant with id: ${response.data.id} created`)
    }

    return (
        <div className="w-full p-5">
            <div className="text-lg font-semibold mb-5">
                Create Assistant Template
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-6">

                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="label"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Label</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="modelName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Model Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="systemPrompt"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>System Prompt</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} rows={10}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="temperature"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Temperature</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="number"/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                        >
                            Create
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}