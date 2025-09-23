import {useNavigate} from "@remix-run/react";
import {Button} from "~/components/ui/button";
import {MessageCircle} from "lucide-react";

export default function CreateChatButton() {
    const navigate = useNavigate()

    return (
        <Button className="bg-teal-600 hover:bg-teal-700" onClick={() => navigate("/app/chat/new")}>
            <MessageCircle/> Iniciar una nueva conversación
        </Button>
    )
}