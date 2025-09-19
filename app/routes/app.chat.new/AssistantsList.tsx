import {Separator} from "~/components/ui/separator";
import {useQuery} from "@tanstack/react-query";
import {getAllAssistantsOptions, getAllMessagesForChatOptions} from "~/services/aurora/@tanstack/react-query.gen";

export default function AssistantsList() {
    return (
        <div>
            <AssistantSelectorList/>
        </div>
    )
}

function AssistantSelectorList() {
    const {data, isLoading, isError, error} = useQuery({
        ...getAllAssistantsOptions()
    })
    if (isLoading || data===undefined) return <div className="flex-1 flex items-center justify-center">Cargando asistentes...</div>
    if (isError) return <div className="flex-1 flex items-center justify-center text-red-500">{error.message}</div>
    if (!data || data.length === 0) return <div className="flex-1 flex items-center justify-center text-gray-500">Aun no existe ningun asistente con el que puedas platicar!</div>


    return (
        <div className="flex-1 overflow-y-auto lg:px-10 lg:py-5 px-5 py-2 flex flex-col gap-5">

            <div className="text-xl font-semibold">
                Inicia una nueva conversacion
            </div>

            <Separator />

            <div>
                {
                    data.map((assistant) => (
                        <div>
                            {assistant.assistant_name}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}