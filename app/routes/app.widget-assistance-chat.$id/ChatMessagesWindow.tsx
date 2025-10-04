import {useQuery} from "@tanstack/react-query";
import {getAllMessagesForWidgetAssistanceChatWithIdOptions} from "~/services/aurora/@tanstack/react-query.gen";
import {useEffect, useRef} from "react";
import UserMessage from "~/routes/app.chat.$id/UserMessage";
import AssistantMessage from "~/routes/app.chat.$id/AssistantMessage";

interface ChatMessagesWindowProptypes {
    chatId: string
}

export default function ChatMessagesWindow(props: ChatMessagesWindowProptypes) {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const {data, error, isLoading, isError} = useQuery({
        ...getAllMessagesForWidgetAssistanceChatWithIdOptions({
            path: {
                id: props.chatId
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
        }
    }, [data])

    if (isLoading || data === undefined) return <div className="w-full h-full flex flex-col">Cargando...</div>
    if (isError) return <div className="w-full h-full flex flex-col">{error.message}</div>
    if (!data) return <div className="w-full h-full flex flex-col">Error, no hay datos...</div>

    return (
        <div ref={scrollContainerRef} className="w-full h-full flex flex-col gap-3">
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
