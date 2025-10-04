import {AuroraWidgetAssistanceChatMessage} from "~/services/aurora";

interface AssistantMessageProptypes {
    message: AuroraWidgetAssistanceChatMessage
}
export default function AssistantMessage(props: AssistantMessageProptypes) {
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