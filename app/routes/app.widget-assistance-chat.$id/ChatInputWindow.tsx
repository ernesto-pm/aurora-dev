import {Send} from "lucide-react";
import {Textarea} from "~/components/ui/textarea";
import {useEffect, useState, useRef, useCallback} from "react";
import {
    insertUserMessageIntoWidgetAssistantChat, triggerAssistantResponseForWidgetAssistanceChat
} from "~/services/aurora";
import {useQueryClient} from "@tanstack/react-query";
import {
    getAllMessagesForWidgetAssistanceChatWithIdQueryKey
} from "~/services/aurora/@tanstack/react-query.gen";
import {useSearchParams} from "@remix-run/react";

interface MessageInputProptypes {
    chatId: string
    optionalInitialUserMessage?: string
}

export default function ChatMessageInput(props: MessageInputProptypes) {
    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const queryClient = useQueryClient()
    const hasAutoSubmitted = useRef(false)

    const [searchParams, setSearchParams] = useSearchParams()

    const handleSubmit = useCallback(async (messageToSend?: string) => {
        // Use provided message or fall back to state
        const messageContent = messageToSend || message

        // Don't submit if message is empty or only whitespace
        if (!messageContent.trim()) return;

        setIsLoading(true)
        try {
            // We first insert the message the user sent
            await insertUserMessageIntoWidgetAssistantChat({
                body: {
                    chatId: props.chatId,
                    content: messageContent
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
            setIsLoading(false)
            console.error('Error sending message:', e)
            alert('Error al enviar el mensaje. Por favor, intenta de nuevo.')
        }
    }, [message, props.chatId, queryClient])

    // Handle auto-submit from URL params
    useEffect(() => {
        const newUserMessage = searchParams.get("newUserMessage")

        if (newUserMessage && !hasAutoSubmitted.current) {
            hasAutoSubmitted.current = true

            // Clear the search param first
            const params = new URLSearchParams(searchParams)
            params.delete("newUserMessage")
            setSearchParams(params)

            // Set the message and submit
            setMessage(newUserMessage)
            handleSubmit(newUserMessage)
        }
    }, [searchParams, setSearchParams, handleSubmit])

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
        }
        // If Shift + Enter, allow default behavior (line break)
    }

    return (
        <div className="flex items-end gap-3">
            <div className="flex-1 relative">
                <Textarea
                    placeholder="Escribe tu mensaje..."
                    className="min-h-[48px] max-h-32 resize-none pr-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    rows={1}
                />
                {isLoading && (
                    <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-md">
                        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
            </div>

            <button
                onClick={() => handleSubmit()}
                className={`
                    flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center
                    transition-all duration-200 transform
                    ${!message.trim() || isLoading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
                }
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                `}
                disabled={!message.trim() || isLoading}
            >
                <Send size={20} className={isLoading ? 'animate-pulse' : ''} />
            </button>
        </div>
    )
}