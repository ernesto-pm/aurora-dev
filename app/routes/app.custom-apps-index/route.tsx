import AppNavigationHeader from "~/routes/app/AppNavigationHeader";
import {LoaderFunctionArgs, MetaFunction} from "@remix-run/cloudflare";
import {getAllCustomAppsForSupabaseUser} from "~/services/aurora";
import {useLoaderData, useNavigate} from "@remix-run/react";
import {getSupabaseAccessToken} from "~/services/supabaseServerClientUtils";
import {Button} from "~/components/ui/button";
import {ArrowRightCircle} from "lucide-react";

export async function loader({request, context}: LoaderFunctionArgs) {
    const accessToken = await getSupabaseAccessToken(request, context)

    const {data} = await getAllCustomAppsForSupabaseUser({
        headers: {
            'Authorization': `bearer ${accessToken}`
        },
        throwOnError: true
    })

    return {
        apps: data
    }
}

export const meta: MetaFunction = () => {
    return [
        { title: "Aurora | Tus Apps" }
    ];
};

export default function Chat() {
    const {apps} = useLoaderData<typeof loader>()
    const navigate = useNavigate()

    return (
        <div>
            <AppNavigationHeader headerTitle="Tus Apps"/>

            <div className="flex flex-col gap-5 w-full h-full items-start p-10 py-5">
                {
                    apps.length === 0 && <div>Aún no cuentas con ninguna App</div>
                }
                {
                    apps.length !== 0 && (
                        <div className="flex flex-col flex-wrap gap-5">
                            {
                                apps.map(app => (
                                    <div key={app.id} className="p-5 flex flex-col gap-5 max-w-[350px] bg-sidebar shadow-md rounded-xl">
                                        <div className="font-semibold">
                                            {app.name}
                                        </div>
                                        <div className="text-sm font-semibold text-muted-foreground">
                                            {app.business_name}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {app.description}
                                        </div>
                                        <div>
                                            <Button
                                                onClick={() => navigate(`/app/custom-app/${app.unique_identifier}`)}
                                            >
                                                Acceder a la App <ArrowRightCircle/>
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}