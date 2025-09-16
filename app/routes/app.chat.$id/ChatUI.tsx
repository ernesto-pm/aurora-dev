import {useQuery} from "@tanstack/react-query";
import {getAllMessagesForChatOptions} from "~/services/aurora/@tanstack/react-query.gen";
import {AuroraChatMessage} from "~/services/aurora";
import {useEffect, useRef} from "react";

interface ChatUIProptypes {
    chatId: string
}

export default function ChatUI(props: ChatUIProptypes) {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const {data, isLoading, isError, error} = useQuery({
        ...getAllMessagesForChatOptions({
            query: {
                chatId: props.chatId
            }
        })
    })

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (scrollContainerRef.current && data && data.length > 0) {
            scrollContainerRef.current.scrollTo({
                top: scrollContainerRef.current.scrollHeight,
                behavior: 'smooth'
            })

            // scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight
        }
    }, [data])

    if (isLoading || data===undefined) return <div className="flex-1 flex items-center justify-center">Cargando mensajes...</div>
    if (isError) return <div className="flex-1 flex items-center justify-center text-red-500">{error.message}</div>
    if (!data || data.length === 0) return <div className="flex-1 flex items-center justify-center text-gray-500">Aun no cuentas con ningun mensaje en esta conversacion!</div>

    return (
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-5">
            {
                data.map(
                    (message) => {
                        if (message.role === 'user') {
                            return <UserMessage key={message.id} message={message}/>
                        } else if (message.role === 'assistant') {
                            return <AssistantMessage key={message.id} message={message}/>
                        } else {
                            return <div key={message.id}></div>
                        }
                    }
                )
            }
        </div>
    )
}

interface UserMessageProptypes {
    message: AuroraChatMessage
}
function UserMessage(props: UserMessageProptypes) {
    const messageTime = new Date(props.message.created_at).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: true})

    return (
        <div className="flex justify-end">
            <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-blue-500 text-white rounded-br-none">
                <p className="text-sm whitespace-pre-wrap">
                    {props.message.content}
                </p>
                <p className="text-xs mt-1 text-blue-100">
                    {messageTime}
                </p>
            </div>
        </div>
    )
}

interface AssistantMessageProptypes {
    message: AuroraChatMessage
}
function AssistantMessage(props: AssistantMessageProptypes) {
    const messageTime = new Date(props.message.created_at).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: true})

    return (
        <div className="flex justify-start">
            <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-white text-gray-800 border border-gray-200 rounded-bl-none">
                <p className="text-sm whitespace-pre-wrap">
                    {props.message.content}
                </p>
                <p className="text-xs mt-1 text-gray-500">
                    {messageTime}
                </p>
            </div>
        </div>
    )
}