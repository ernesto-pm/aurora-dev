import type {LoaderFunctionArgs, MetaFunction} from "@remix-run/cloudflare";
import AppNavigationHeader from "~/routes/app/AppNavigationHeader";
import { useState } from "react";
import ChatUI from "~/routes/app.chat.mockLolaxo.$id/ChatUI";
import ChatMessageInput from "~/routes/app.chat.mockLolaxo.$id/ChatMessageInput";
import {useLoaderData} from "@remix-run/react";
import MockGroupedProductsWidget from "~/routes/app.dashboard/widgets/MockGroupedProductsWidget";

export const meta: MetaFunction = () => {
    return [
        { title: "Aurora | Preguntale a Aurora" }
    ];
}

export interface MockMessage {
    role: 'user' | 'assistant' | 'jsx'
    content: string
    createdAt: string
}

export function loader({params}: LoaderFunctionArgs) {
    if (!params.id) {
        throw new Error("Error, ID must be specified")
    }

    return {
        'chatId': params.id
    }
}


const MOCK_INITIAL_SETS = {
    'chartHelp': [
        {
            role: 'jsx',
            content: MockGroupedProductsWidget,
            createdAt: new Date().toISOString()
        },
        {
            role: 'assistant',
            content: 'What do you need help with for this chart?',
            createdAt: new Date().toISOString()
        }
    ],
    'generalAssistant': [
        {
            role: 'assistant',
            content: 'Hello! how can I help you today?',
            createdAt: new Date().toISOString()
        }
    ]
}


const ASSISTANT_RESPONSES = {
    'chartHelp': [
        `This is a chart that displays the product ecosystem of your products. Each circle represents a product, grouped by color into categories such as mounts, ink cartridges, bottled inks, and custom stamps. The size of each circle shows how popular the item is, while the lines illustrate relationships between products—either compatibility (like a mount with its ink cartridge) or common co-purchases. In simple terms, it’s a visual map of the shop that highlights which products matter most and how they connect.`
    ],
    'generalAssistant': [
        'Looking at your data, it looks like you could create bundle for Ink + the most selling stamp (Melon 6), Here are some suggestions: \n\n' +
        'Launch a new marketing campaign bundling both products (your margins allow this) \n\n' +
        'Create new designs showcasing the bundle \n\n' +
        'Create a new instagram campaign with the new bundle \n\n' +
        'I can help you by designing the Ad as an image or video and posting it to social media, do you want to do that now?'
    ]
}

export default function Chat() {
    const {chatId} = useLoaderData<typeof loader>()
    const [mockData, setMockData] = useState<Array<MockMessage>>(MOCK_INITIAL_SETS[chatId])

    function addUserMessage(userMessage: string) {
        setMockData((oldMessages) => [...oldMessages, {
            role: 'user',
            content: userMessage,
            createdAt: new Date().toISOString()
        }])

        setTimeout(() => {

            // get response
            const response = ASSISTANT_RESPONSES[chatId][0]

            setMockData((oldMessages) => [...oldMessages, {
                role: 'assistant',
                content: response,
                createdAt: new Date().toISOString()
            }])
        }, 500)
    }


    return (
        <div className="flex flex-col h-full w-full">
            <AppNavigationHeader headerTitle="Chat" />
            <ChatUI messages={mockData} />
            <ChatMessageInput addUserMessage={addUserMessage}/>
        </div>
    )
}


/*
   <div className="flex-1 overflow-y-auto">
                {
                    Array.from([11,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]).map( (i) => (
                        <div className="mt-10">
                            1
                        </div>
                    ))
                }
            </div>

 */