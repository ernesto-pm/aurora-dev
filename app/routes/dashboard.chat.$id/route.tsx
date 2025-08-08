import {ArrowLeft, Bot} from "lucide-react";
import {useNavigate} from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import {Textarea} from "~/components/ui/textarea";
import {Button} from "~/components/ui/button";

export async function loader({ params }: LoaderFunctionArgs) {
    const { id } = params;
    if (!id) throw new Error("ID must be specified");

    return {
        id: id
    }
}

export default function Chat() {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col h-dvh">

            {/* HEADER */}
            <div className="flex-none py-2 px-5 bg-blue-700 flex space-x-4 items-center">
                <ArrowLeft className="text-white cursor-pointer" onClick={() => navigate("/dashboard")}/>
                <Bot className="text-white"/>
                <div className="flex flex-col">
                    <div className="text-md text-white">
                        Aurora
                    </div>
                    <div className="text-xs text-white">
                        Platica con Aurora!
                    </div>
                </div>
            </div>

            {/* MAIN (only scrollable area) */}
            <main className="flex-1 overflow-auto bg-gray-100 p-5">
                Messages will show up here
            </main>

            {/* FOOTER */}
            <footer className="flex-none p-5">
                <div className="flex flex-row items-center space-x-2">
                    <Textarea className="border-gray-800 text-lg"/>
                    <Button>
                        Enviar
                    </Button>
                </div>
            </footer>

        </div>
    )
}