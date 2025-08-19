import { useForm } from "react-hook-form"
import {LoaderFunctionArgs, type MetaFunction} from "@remix-run/cloudflare";
import {getSupabaseCreds} from "~/services/envUtils";
import {Link, useLoaderData, useNavigate} from "@remix-run/react";
import {createBrowserClient} from "@supabase/ssr";
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/button";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "~/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form";

export const meta: MetaFunction = () => {
    return [
        { title: "Aurora | Inicia Sesión" }
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
    email: z.string().email("Por favor introduce un email valido").nonempty("Campo requerido"),
    password: z.string().nonempty("Tu contraseña es requerida")
})

export default function Login() {
    const {env} = useLoaderData<typeof loader>()
    const supabase = createBrowserClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    async function onSubmit(values: FormValues) {
        const response = await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password
        })

        if (response.error) {
            alert("Error")
            return
        }

        navigate("/app")
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
                            <CardTitle className="text-2xl">Inicia Sesión</CardTitle>
                            <CardDescription>
                                Inicia sesión con tus credenciales. Si no tienes una cuenta aún, registrate <Link to={"/registrate"} className="text-blue-600 underline">aquí</Link>
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
                                                            <Input placeholder="Tu correo..." {...field} />
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

                                        <Button
                                            type="submit"
                                            className="w-full"
                                        >
                                            Iniciar sesión
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}