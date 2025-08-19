import {json, LoaderFunctionArgs, type MetaFunction, redirect} from "@remix-run/cloudflare"
import {getSupabaseCreds} from "~/services/envUtils";
import {createBrowserClient, createServerClient, parseCookieHeader, serializeCookieHeader} from "@supabase/ssr";
import {Outlet, useLoaderData, useLocation, useRevalidator} from "@remix-run/react";
import {useEffect, useState} from "react";
import { Database } from "~/services/supabase/database.types";
import {SidebarProvider} from "~/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import AppIndex from "~/routes/app/AppIndex";

export const meta: MetaFunction = () => {
    return [
        { title: "Aurora | App" }
    ];
};

export async function loader({request, context}: LoaderFunctionArgs) {
    const {SUPABASE_URL, SUPABASE_ANON_KEY} = getSupabaseCreds(context)
    const headers = new Headers()
    const env = {SUPABASE_URL, SUPABASE_ANON_KEY}

    const response = new Response()
    const supabase = createServerClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY,
        {
            cookies: {
                //@ts-expect-error Error weird api ?
                getAll() {
                    return parseCookieHeader(request.headers.get('Cookie') ?? '')
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach((
                        {name, value, options}
                    ) => headers.append('Set-Cookie', serializeCookieHeader(name, value, options)))
                },
            },
        })

    const {data: {user}} = await supabase.auth.getUser()
    const {data: {session}} = await supabase.auth.getSession()

    if (!session) throw redirect("/login")

    return json({
        env,
        user,
        'accessToken': session?.access_token
    }, {
        headers: response.headers
    })
}

function checkIsAppIndex(location: Location) {
    const pathParts = location.pathname.split("/")

    let lastPartOfUrl = pathParts[pathParts.length - 1]
    if (lastPartOfUrl === '') {
        lastPartOfUrl = pathParts[pathParts.length - 2] // if we have a '/' at the end.. lol
    }

    return lastPartOfUrl == "app"
}

export default function App() {
    const {env, accessToken, user} = useLoaderData<typeof loader>()
    const [supabase] = useState(() => createBrowserClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY))
    const { revalidate } = useRevalidator()

    const location = useLocation()
    // @ts-expect-error location cant be typed
    const isAppIndex = checkIsAppIndex(location)

    useEffect(() => {
        const {data: {subscription}} = supabase.auth.onAuthStateChange((event, session) => {
            if (event !== 'INITIAL_SESSION' && session?.access_token !== accessToken) {
                // server and client are out of sync.
                console.log("Client and server are out of sync")
                revalidate()
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [accessToken, supabase, revalidate])

    if (!user) return <div>Inicia sesión primero.</div>

    return (
        <SidebarProvider>
            <AppSidebar user={user} supabase={supabase} />
            {
                isAppIndex && <AppIndex/>
            }
            {
                !isAppIndex && <Outlet context={{user, accessToken}}/>
            }
        </SidebarProvider>
    )
}