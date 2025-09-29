import {useNavigate, useOutletContext} from "@remix-run/react";
import {useQuery} from "@tanstack/react-query";
import {
    getAllChatsForSupabaseUserOptions
} from "~/services/aurora/@tanstack/react-query.gen";
import {Button} from "~/components/ui/button";
import {Trash} from "lucide-react";
import {GetAllChatsForSupabaseUserRow} from "~/services/aurora";

interface ChatListProptypes {
    chats: GetAllChatsForSupabaseUserRow[]
}

export default function ChatList(props: ChatListProptypes) {
    /*
    const {accessToken} = useOutletContext<{accessToken: string}>()

    const {data, isLoading, isError, error} = useQuery({
        ...getAllChatsForSupabaseUserOptions({
            headers: {
                'Authorization': `bearer ${accessToken}`
            },
            throwOnError: true
        })
    })

    if (isLoading || data===undefined) return <div>Cargando datos...</div>
    if (isError) return <div>{error.message}</div>
    if (!data || data.length === 0) return <div>Aun no cuentas con ninguna conversacion!</div>
     */


    return (
        <div className="flex flex-col gap-5">
            <div className="text-xl font-semibold">
                Tus conversaciones con Aurora
            </div>

            <div className="flex flex-row gap-5 flex-wrap">
                {
                    props.chats.map(
                        (chat, index) => (
                            <ChatElement chat={chat} key={chat.id} index={index} />
                        )
                    )
                }
            </div>
        </div>
    )
}


interface ChatElementProptypes {
    chat: GetAllChatsForSupabaseUserRow
    index: number
}
function ChatElement(props: ChatElementProptypes) {
    const navigate = useNavigate()

    return (
        <div className="h-[150px] w-[300px] bg-sidebar-accent flex flex-col gap-2 items-center justify-center rounded-xl shadow-md">
            <div className="font-semibold">
                {props.chat.display_name || `Nuevo chat #${props.index + 1}`}
            </div>
            <div className="text-muted-foreground text-sm text-center flex flex-col">
                <div>
                    {props.chat.business_name}
                </div>
                <div>
                    {props.chat.data_source_name}
                </div>
            </div>
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    onClick={() => navigate(`/app/chat/${props.chat.id}`)}
                >
                    Accede a esta conversación
                </Button>
                <Button variant="destructive">
                    <Trash/>
                </Button>
            </div>
        </div>
    )
}