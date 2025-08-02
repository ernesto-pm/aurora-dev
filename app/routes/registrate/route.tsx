import { useForm } from "react-hook-form"
import {LoaderFunctionArgs} from "@remix-run/cloudflare";
import {getSupabaseCreds} from "~/services/envUtils";
import { useLoaderData } from "@remix-run/react";
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

export default function Registro() {
    const {env} = useLoaderData<typeof loader>()
    const supabase = createBrowserClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)

    const {
        register,
        handleSubmit
    } = useForm<FormValues>()

    async function onSubmit(values: FormValues) {
        const user = await supabase.auth.signUp({
            email: values.email,
            password: values.password
        })

        console.log(user)
    }

    return (
        <div className="p-5 flex flex-col space-y-5">

            <div className="text-2xl">
                Registrate
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
                        contraseña (de al menos 6 caracteres):
                    </div>
                    <Input
                        type="password"
                        {...register("password")}
                    />
                </div>

                <Button type="submit">
                    Registrate
                </Button>

            </form>
        </div>
    )
}