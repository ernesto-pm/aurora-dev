import AppNavigationHeader from "~/routes/app/AppNavigationHeader";
import type { MetaFunction } from "@remix-run/cloudflare";
import CreateChat from "~/routes/app.chat/CreateChat";
import { Button } from "~/components/ui/button";
import {ExternalLink} from "lucide-react";
import {Separator} from "~/components/ui/separator";


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

                <div className="text-2xl font-semibold">
                    Tus conversaciones con Aurora
                </div>

                <div className="flex flex-row gap-2">

                   <div className="h-[150px] w-[300px] bg-sidebar-accent flex flex-col gap-2 items-center justify-center rounded-xl shadow-md">
                       <div className="font-semibold">
                           My chat #1
                       </div>
                       <div className="text-muted-foreground">
                           Simple summary of chat goes here
                       </div>
                       <div>
                           <Button variant="outline">
                               Abrir esta conversación <ExternalLink/>
                           </Button>
                       </div>
                   </div>

                </div>
            </div>
        </div>
    )
}