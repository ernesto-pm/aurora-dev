// import {useOutletContext} from "@remix-run/react";
import {User} from "@supabase/supabase-js"
import {Button} from "~/components/ui/button";
import {useNavigate} from "@remix-run/react";

interface PropTypes {
    user: User
}

export default function DashboardIndex({user}: PropTypes) {
    const navigate = useNavigate()

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            Bienvenido/a a Aurora {user.email}!

            <div className="flex space-x-2">
                <Button className="w-auto" onClick={() => navigate("/dashboard/chat")}>
                    Platica con el Asistente
                </Button>

                <Button className="w-auto">
                    Revisar base de conocimientos
                </Button>
            </div>
        </div>
    )
}