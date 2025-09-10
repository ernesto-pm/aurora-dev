import AppNavigationHeader from "~/routes/app/AppNavigationHeader";
import type { MetaFunction } from "@remix-run/cloudflare";
import CreateChat from "~/routes/app.chat-index/CreateChat";
import {Separator} from "~/components/ui/separator";
import ChatList from "~/routes/app.chat-index/ChatList";


export const meta: MetaFunction = () => {
    return [
        { title: "Aurora | Preguntale a Aurora" }
    ];
};

export default function Chat() {
    return (
        <div>
            <AppNavigationHeader headerTitle="Preguntale a Aurora"/>

            <div className="flex flex-col gap-5 w-full h-full items-start p-10 py-5">
                <CreateChat/>
                <Separator/>
                <ChatList/>
            </div>
        </div>
    )
}