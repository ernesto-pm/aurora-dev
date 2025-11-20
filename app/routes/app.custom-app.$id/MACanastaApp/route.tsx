import {Button} from "~/components/ui/button";
import {useNavigate} from "@remix-run/react";

export default function MACanastaApp() {
    const navigate = useNavigate()

    return(
        <div>
            <Button onClick={() => navigate("/app/ma-canastas-index")}>
                Ir a la aplicacion
            </Button>
        </div>
    )
}