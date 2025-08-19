import { useForm } from "react-hook-form"
import {LoaderFunctionArgs, type MetaFunction} from "@remix-run/cloudflare";
import {getSupabaseCreds} from "~/services/envUtils";
import {Link, useLoaderData } from "@remix-run/react";
import {createBrowserClient} from "@supabase/ssr";
import { zodResolver } from "@hookform/resolvers/zod";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "~/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form";
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/button";
import {Alert} from "~/components/ui/alert";
import {useState} from "react";
import {z} from "zod"

export const meta: MetaFunction = () => {
    return [
        { title: "Aurora | Registrate" }
    ];
};

type FormValues = {
    email: string
    password: string
}

export async function loader({context}: LoaderFunctionArgs) {
    const creds = getSupabaseCreds(context)

    return {
        env: {
            SUPABASE_URL: creds.SUPABASE_URL,
            SUPABASE_ANON_KEY: creds.SUPABASE_ANON_KEY
        }
    }
}

const FormSchema = z.object({
    email: z.string().email("Please enter a valid e-mail").nonempty("Required field"),
    password: z.string().nonempty("Password is required"),
    displayName: z.string().nonempty("Display name is required")
})

export default function Registro() {
    const {env} = useLoaderData<typeof loader>()
    const supabase = createBrowserClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
            displayName: ""
        },
    })
    const [isLoading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    async function onSubmit(values: FormValues) {
        setLoading(true)
        const {data, error} = await supabase.auth.signUp({
            email: values.email,
            password: values.password,
            options: {
                data: {
                    product: 'aurora-dev'
                }
            }
        })

        setLoading(false)
        if (error) {
            setErrorMessage(error.message)
            return
        }
        setSuccess(true)
    }

    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <div className="flex justify-center mb-5">
                    <img src="/auroraLogo.png" className="w-14"/>
                </div>
                <div className="flex flex-col gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Registrate</CardTitle>
                            <CardDescription>
                                Registrate para empezar a usar Aurora. Si ya tienes una cuenta, inicia sesión <Link to={"/login"} className="text-blue-600 underline">aquí</Link>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <div className="flex flex-col gap-6">

                                        {/* Email */}
                                        <div className="grid gap-2">
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Email</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Tu correo electrónico..." {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>


                                        {/* Password */}
                                        <div className="grid gap-2">
                                            <FormField
                                                control={form.control}
                                                name="password"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Contraseña</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Tu contraseña..." {...field} type="password"/>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <FormField
                                                control={form.control}
                                                name="displayName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Cuál es tu nombre?</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Tu nombre completo..." {...field} type="text"/>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full"
                                            disabled={isLoading}
                                        >
                                            Registrate
                                        </Button>
                                    </div>
                                </form>
                            </Form>

                            {
                                errorMessage
                                &&
                                <Alert className="mt-2" variant="destructive">
                                    {errorMessage}
                                </Alert>
                            }

                            {
                                success
                                &&
                                <Alert className="mt-2 border-green-700 text-green-700">
                                    Exito! ingresa <Link to="/login" className="underline text-blue-600">aquí</Link> para iniciar sesión.
                                </Alert>
                            }
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}