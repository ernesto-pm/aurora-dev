import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form";
import {useForm} from "react-hook-form";
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/button";
import {Textarea} from "~/components/ui/textarea";
import {lettaCreateMemoryBlockTemplate} from "~/services/aurora";

interface FormValues {
    label: string
    description: string
}

export default function CreateLettaMemoryBlockTemplate() {
    const form = useForm<FormValues>({
        defaultValues: {
            label: "",
            description: ""
        },
    })

    async function onSubmit(formData: FormValues) {
        const response = await lettaCreateMemoryBlockTemplate({
            body: {
                label: formData.label,
                description: formData.description
            },
            throwOnError: true
        })

        if (!response.data) {
            throw new Error("No response from server")
        }

        alert(`Success, memory block with id: ${response.data.id} created`)
    }

    return (
        <div className="w-full p-5">

            <div className="text-lg font-semibold mb-5">
                Create Memory Block Template
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
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} rows={10}/>
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