import {AuroraWidgetAssistanceChatMessage} from "~/services/aurora";

interface UserMessageProptypes {
    message: AuroraWidgetAssistanceChatMessage
}
export default function UserMessage(props: UserMessageProptypes) {
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