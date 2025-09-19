import AppNavigationHeader from "~/routes/app/AppNavigationHeader";
import ChatUI from "~/routes/app.chat.$id/ChatUI";
import ChatMessageInput from "~/routes/app.chat.$id/ChatMessageInput";
import AssistantsList from "~/routes/app.chat.new/AssistantsList";

export default function NewChat() {
    return (
        <div className="flex flex-col h-full w-full">
            <AppNavigationHeader headerTitle="Chat" />
            <AssistantsList/>
        </div>
    )
}