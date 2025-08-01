import { useForm } from "react-hook-form"
import {LoaderFunctionArgs} from "@remix-run/cloudflare";
import {getSupabaseCreds} from "~/services/envUtils";
import { useLoaderData, useNavigate } from "@remix-run/react";
import {createBrowserClient} from "@supabase/ssr";

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
        <div>
            <div>Registro</div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

                <div className="flex flex-col">
                    <div>
                        Email:
                    </div>
                    <input
                        type="text"
                        {...register("email")}
                    />
                </div>

                <div className="flex flex-col">
                    <div>
                        Password:
                    </div>
                    <input
                        type="password"
                        {...register("password")}
                    />
                </div>

                <button type="submit">
                    Haz login
                </button>
            </form>
        </div>
    )
}