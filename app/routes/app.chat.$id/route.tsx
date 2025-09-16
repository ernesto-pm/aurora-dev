import type {LoaderFunctionArgs, MetaFunction} from "@remix-run/cloudflare";
import ChatUI from "~/routes/app.chat.$id/ChatUI";
import {useLoaderData} from "@remix-run/react";
import ChatMessageInput from "~/routes/app.chat.$id/ChatMessageInput";
import AppNavigationHeader from "~/routes/app/AppNavigationHeader";

export const meta: MetaFunction = () => {
    return [
        { title: "Aurora | Preguntale a Aurora" }
    ];
}

export function loader({params}: LoaderFunctionArgs) {
    if (!params.id) {
        throw new Error("Error, ID must be specified")
    }

    return {
        'chatId': params.id
    }
}

export default function Chat() {
    const {chatId} = useLoaderData<typeof loader>()

    return (
        <div className="flex flex-col h-full w-full">
            <AppNavigationHeader headerTitle="Chat" />
            <ChatUI chatId={chatId} />
            <ChatMessageInput chatId={chatId}/>
        </div>
    )
}


/*
   <div className="flex-1 overflow-y-auto">
                {
                    Array.from([11,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]).map( (i) => (
                        <div className="mt-10">
                            1
                        </div>
                    ))
                }
            </div>

 */