import {useQuery} from "@tanstack/react-query";
import {getAllMessagesForWidgetAssistanceChatWithIdOptions} from "~/services/aurora/@tanstack/react-query.gen";
import {useEffect, useRef} from "react";
import UserMessage from "~/routes/app.chat.$id/UserMessage";
import AssistantMessage from "~/routes/app.chat.$id/AssistantMessage";

interface ChatMessagesWindowProptypes {
    chatId: string
}

export default function ChatMessagesWindow(props: ChatMessagesWindowProptypes) {
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const {data, error, isLoading, isError} = useQuery({
        ...getAllMessagesForWidgetAssistanceChatWithIdOptions({
            path: {
                id: props.chatId
            }
        })
    })

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (messagesEndRef.current && data && data.length > 0) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [data])

    if (isLoading || data === undefined) {
        return (
            <div className="flex items-center justify-center h-full text-gray-500">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce animation-delay-0"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce animation-delay-200"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce animation-delay-400"></div>
                    <span className="ml-2">Cargando mensajes...</span>
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-red-500 bg-red-50 px-4 py-2 rounded-lg">
                    Error: {error.message}
                </div>
            </div>
        )
    }

    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center h-full text-gray-400">
                <div className="text-center">
                    <p className="text-lg">No hay mensajes aún</p>
                    <p className="text-sm mt-2">Comienza una conversación con Aurora</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4 py-4">
            {data.map((message) => {
                if (message.role === 'user') {
                    return <UserMessage key={message.id} message={message}/>
                } else if (message.role === 'assistant') {
                    return <AssistantMessage key={message.id} message={message}/>
                } else {
                    return null
                }
            })}
            <div ref={messagesEndRef} />
        </div>
    )
}