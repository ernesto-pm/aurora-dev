import AppNavigationHeader from "~/routes/app/AppNavigationHeader";
import NewChatForm from "~/routes/app.chat.new/NewChatForm";
import {getAllAssistantBrains, getAllAssistants} from "~/services/aurora";
import {useLoaderData} from "@remix-run/react";

export async function loader() {
    const {data: allAssistantsData} = await getAllAssistants({throwOnError: true})
    const {data: allAssistantBrains} = await getAllAssistantBrains({throwOnError: true})

    if (!allAssistantsData || !allAssistantBrains) {
        throw new Error("Alguno de los datos fallo en cargar")
    }

    return {
        assistants: allAssistantsData,
        assistantBrains: allAssistantBrains
    }

}


export default function NewChat() {
    const {assistants, assistantBrains} = useLoaderData<typeof loader>()

    return (
        <div className="flex flex-col h-full w-full">
            <AppNavigationHeader headerTitle="Inicia una nueva conversacion" />
            <NewChatForm
                assistants={assistants}
                assistantBrains={assistantBrains}
            />
        </div>
    )
}