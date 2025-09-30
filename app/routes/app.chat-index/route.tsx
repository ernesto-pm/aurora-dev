import AppNavigationHeader from "~/routes/app/AppNavigationHeader";
import {LoaderFunctionArgs, MetaFunction} from "@remix-run/cloudflare";
import CreateChatButton from "~/routes/app.chat-index/CreateChatButton";
import {Separator} from "~/components/ui/separator";
import ChatList from "~/routes/app.chat-index/ChatList";
import {getAllChatsForSupabaseUser} from "~/services/aurora";
import {useLoaderData} from "@remix-run/react";
import {getSupabaseAccessToken} from "~/services/supabaseServerClientUtils";

export async function loader({request, context}: LoaderFunctionArgs) {
    const accessToken = await getSupabaseAccessToken(request, context)

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