import {LoaderFunctionArgs} from "@remix-run/cloudflare";
import {getSupabaseAccessToken} from "~/services/supabaseServerClientUtils";
import {getWidgetAssistanceChatWithId} from "~/services/aurora";
import {useLoaderData, useSearchParams} from "@remix-run/react";
import WidgetRenderer from "~/routes/app.widget-assistance-chat.$id/WidgetRenderer"
import AppNavigationHeader from "~/routes/app/AppNavigationHeader";
import ChatMessagesWindow from "~/routes/app.widget-assistance-chat.$id/ChatMessagesWindow";
import ChatInputWindow from "~/routes/app.widget-assistance-chat.$id/ChatInputWindow";
import {useEffect} from "react";

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
        <div className="flex flex-col h-screen w-full bg-gray-50">
            <AppNavigationHeader headerTitle={chat.display_name || "Consulta con Aurora"}/>

            <div className="flex flex-1 flex-col min-h-0 p-4 gap-4">
                {/* Widget Container - Fixed height with better styling */}
                <div className="p-4 flex-shrink-0">
                    <WidgetRenderer
                        dashboardId={chat.dashboard_id}
                        widgetIdentifier={chat.widget_unique_identifier}
                    />
                </div>

                {/* Chat Messages Container - Flexible height with proper scroll */}
                <div className="flex-1 min-h-0 bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col">
                    <div className="flex-1 overflow-y-auto">
                        <ChatMessagesWindow
                            chatId={chat.id}
                        />
                    </div>
                </div>

                {/* Chat Input - Fixed at bottom */}
                <div className="flex-shrink-0 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <ChatInputWindow chatId={chat.id} />
                </div>
            </div>
        </div>
    )
}