import {Send} from "lucide-react";
import {Textarea} from "~/components/ui/textarea";
import {useState} from "react";

interface MessageInputProptypes {
    addUserMessage: (message: string) => void
}

export default function ChatMessageInput(props: MessageInputProptypes) {
    const [message, setMessage] = useState("")

    async function handleSubmit() {
        props.addUserMessage(message)
        setMessage("")
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
                />

                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                    <Send size={20} />
                </button>
            </div>
        </div>
    )
}