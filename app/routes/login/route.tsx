import { useForm } from "react-hook-form"
import {LoaderFunctionArgs} from "@remix-run/cloudflare";
import {getSupabaseCreds} from "~/services/envUtils";
import { useLoaderData, useNavigate } from "@remix-run/react";
import {createBrowserClient} from "@supabase/ssr";
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/button";

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

export default function Login() {
    const {env} = useLoaderData<typeof loader>()
    const supabase = createBrowserClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
    const navigate = useNavigate()

    const {
        register,
        handleSubmit
    } = useForm<FormValues>()

    async function onSubmit(values: FormValues) {
        const response = await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password
        })

        if (response.error) {
            alert("Error")
            return
        }

        navigate("/dashboard")
    }

    return (
        <div className="p-5 flex flex-col space-y-5">

            <div className="text-2xl">
                Inicia Sesión
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2">

                <div className="flex flex-col">
                    <div>
                        e-mail:
                    </div>
                    <Input
                        type="text"
                        {...register("email")}
                    />
                </div>

                <div className="flex flex-col">
                    <div>
                        contraseña:
                    </div>
                    <Input
                        type="password"
                        {...register("password")}
                    />
                </div>

                <Button type="submit">
                    Inicia Sesion
                </Button>

            </form>
        </div>
    )
}