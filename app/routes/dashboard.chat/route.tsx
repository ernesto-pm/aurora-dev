import {Button} from "~/components/ui/button";
import {LoaderFunctionArgs} from "@remix-run/cloudflare";

export async function loader({request}: LoaderFunctionArgs) {
    /*
    const lettaClient = getLettaClient()

    try {
        const blocks = await lettaClient.getBlocks()
        console.log(blocks)
    } catch (e) {
        console.error(e)
    }
     */

    return null
}

export default function DashboardIndex() {

    return (
        <div className="p-5">
            Cargar asistentes aqui

            <div>
                <Button>
                    Nuevo Asistente
                </Button>
            </div>
        </div>
    )
}