import React, {ReactDOM, useRef} from "react";
import { MockMessage } from "./route";

interface ChatUIProptypes {
    messages: Array<MockMessage>
}


export default function ChatUI(props: ChatUIProptypes) {
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    return (
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto lg:px-10 lg:py-5 px-5 py-2">
            {
                props.messages.map(
                    (message, i) => {
                        if (message.role === 'user') {
                            return <UserMessage key={i} message={message}/>
                        } else if (message.role === 'assistant') {
                            return <AssistantMessage key={i} message={message}/>
                        } else if (message.role === 'jsx') {
                            const Component = message.content

                            return (
                                <div key={i} className="flex mb-5">
                                    <Component/>
                                </div>
                            )
                        } else {
                            return <div key={i}></div>
                        }
                    }
                )
            }
        </div>
    )
}

interface UserMessageProptypes {
    message: MockMessage
}
function UserMessage(props: UserMessageProptypes) {
    const messageTime = new Date(props.message.createdAt).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: true})

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
    message: MockMessage
}
function AssistantMessage(props: AssistantMessageProptypes) {
    const messageTime = new Date(props.message.createdAt).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: true})

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