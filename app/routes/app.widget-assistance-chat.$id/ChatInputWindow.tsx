import {Send} from "lucide-react";
import {Textarea} from "~/components/ui/textarea";
import {useState} from "react";
import {
    insertUserMessageIntoWidgetAssistantChat, triggerAssistantResponseForWidgetAssistanceChat
} from "~/services/aurora";
import {useQueryClient} from "@tanstack/react-query";
import {
    getAllMessagesForWidgetAssistanceChatWithIdQueryKey
} from "~/services/aurora/@tanstack/react-query.gen";

interface MessageInputProptypes {
    chatId: string
}

export default function ChatMessageInput(props: MessageInputProptypes) {
    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const queryClient = useQueryClient()

    async function handleSubmit() {
        setIsLoading(true)
        try {

            // We first insert the message the user sent
            await insertUserMessageIntoWidgetAssistantChat({
                body: {
                    chatId: props.chatId,
                    content: message
                },
                throwOnError: true
            })

            // we clear the message since this was successful and invalidate the query to refresh the window
            setMessage("")
            await queryClient.invalidateQueries({
                queryKey: getAllMessagesForWidgetAssistanceChatWithIdQueryKey({
                    path: {
                        id: props.chatId
                    }
                })
            })

            // we trigger a new assistant response and invalidate queries if we had success doing so..
            await triggerAssistantResponseForWidgetAssistanceChat({
                body: {
                    chatId: props.chatId
                }
            })
            await queryClient.invalidateQueries({
                queryKey: getAllMessagesForWidgetAssistanceChatWithIdQueryKey({
                    path: {
                        id: props.chatId
                    }
                })
            })

            setIsLoading(false)
        } catch (e) {
            alert(e)
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
        }
        // If Shift + Enter, allow default behavior (line break)
    }

    return (
        <div className="flex space-x-2">
            <Textarea
                placeholder="Escribe tu mensaje..."
                className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
            />

            <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                disabled={isLoading}
            >
                <Send size={20} />
            </button>
        </div>
    )
}