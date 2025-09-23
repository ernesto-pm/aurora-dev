import AppNavigationHeader from "~/routes/app/AppNavigationHeader";
import NewChatForm from "~/routes/app.chat.new/NewChatForm";

export default function NewChat() {
    return (
        <div className="flex flex-col h-full w-full">
            <AppNavigationHeader headerTitle="Inicia una nueva conversacion" />
            <NewChatForm/>
        </div>
    )
}