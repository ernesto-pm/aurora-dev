import {LoaderFunctionArgs} from "@remix-run/cloudflare";
import {getSupabaseAccessToken} from "~/services/supabaseServerClientUtils";
import {getWidgetAssistanceChatWithId} from "~/services/aurora";
import {useLoaderData} from "@remix-run/react";
import WidgetRenderer from "~/routes/app.widget-assistance-chat.$id/WidgetRenderer"
import AppNavigationHeader from "~/routes/app/AppNavigationHeader";
import ChatMessagesWindow from "~/routes/app.widget-assistance-chat.$id/ChatMessagesWindow";
import ChatInputWindow from "~/routes/app.widget-assistance-chat.$id/ChatInputWindow";

export async function loader({params}: LoaderFunctionArgs) {
    if (!params.id) throw new Error("Error, ID must be specified")
    // const accessToken = await getSupabaseAccessToken(request, context)

    const response = await getWidgetAssistanceChatWithId({
        path: {
            id: params.id
        },
        throwOnError: true
    })

    if (!response.data) throw new Error("Error, no chat data")

    return {
        chat: response.data
    }
}

export default function WidgetAssistanceChat() {
    const {chat} = useLoaderData<typeof loader>()

    return (

        <div className="flex flex-col h-full w-full">
            <AppNavigationHeader headerTitle="Consulta con Aurora"/>

            <div className="flex flex-1 flex-col p-4 overflow-y-auto">

                <div className="h-1/6">
                    <WidgetRenderer
                        dashboardId={chat.dashboard_id}
                        widgetIdentifier={chat.widget_unique_identifier}
                    />
                </div>

                <div className="h-5/6 mt-5 overflow-y-auto bg-sidebar p-5 rounded-md">
                    <ChatMessagesWindow
                        chatId={chat.id}
                    />
                </div>

                <div>
                    <ChatInputWindow
                        chatId={chat.id}
                    />
                </div>
            </div>
        </div>
    )
}