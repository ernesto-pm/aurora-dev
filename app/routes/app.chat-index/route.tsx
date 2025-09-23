import AppNavigationHeader from "~/routes/app/AppNavigationHeader";
import {LoaderFunctionArgs, MetaFunction} from "@remix-run/cloudflare";
import CreateChatButton from "~/routes/app.chat-index/CreateChatButton";
import {Separator} from "~/components/ui/separator";
import ChatList from "~/routes/app.chat-index/ChatList";
import {getSupabaseCreds} from "~/services/envUtils";
import {createServerClient, parseCookieHeader, serializeCookieHeader} from "@supabase/ssr";
import {useQuery} from "@tanstack/react-query";
import {getAllChatsForSupabaseUserOptions} from "~/services/aurora/@tanstack/react-query.gen";
import {getAllChatsForSupabaseUser} from "~/services/aurora";
import {useLoaderData} from "@remix-run/react";

export async function loader({request, context}: LoaderFunctionArgs) {
    const {SUPABASE_URL, SUPABASE_ANON_KEY} = getSupabaseCreds(context)
    const headers = new Headers()

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

    const {data: {session}} = await supabase.auth.getSession()
    if (!session) throw new Error("Error, no access token found")

    const accessToken = session.access_token

    const {data} = await getAllChatsForSupabaseUser({
        headers: {
            'Authorization': `bearer ${accessToken}`
        },
        throwOnError: true
    })

    return {
        chats: data
    }
}


export const meta: MetaFunction = () => {
    return [
        { title: "Aurora | Preguntale a Aurora" }
    ];
};

export default function Chat() {
    const {chats} = useLoaderData<typeof loader>()

    return (
        <div>
            <AppNavigationHeader headerTitle="Preguntale a Aurora"/>

            <div className="flex flex-col gap-5 w-full h-full items-start p-10 py-5">
                <CreateChatButton/>
                <Separator/>
                <ChatList chats={chats}/>
            </div>
        </div>
    )
}