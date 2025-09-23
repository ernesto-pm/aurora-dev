import {Send} from "lucide-react";
import {Textarea} from "~/components/ui/textarea";
import {useState} from "react";
import {generalAssistantChatCompletion} from "~/services/aurora";
import {useQueryClient} from "@tanstack/react-query";
import {getAllMessagesForChatQueryKey} from "~/services/aurora/@tanstack/react-query.gen";

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
            await generalAssistantChatCompletion({
                body: {
                    chatId: props.chatId,
                    newUserMessage: message
                },
                throwOnError: true
            })


            // reaching here means we had a successful chat completion
            await queryClient.invalidateQueries({
                queryKey: getAllMessagesForChatQueryKey({
                    query: {
                        chatId: props.chatId
                    }
                })
            })
            setMessage("")

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
        <div className="bg-white border-t border-gray-200 p-4">
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
        </div>
    )
}