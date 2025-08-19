import { SidebarInset } from "~/components/ui/sidebar";
import AppHeader from "~/routes/app/AppHeader";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import {useOutletContext} from "@remix-run/react";
import {useQuery} from "@tanstack/react-query";
import {getBusinessesForSupabaseUserOptions} from "~/services/aurora/@tanstack/react-query.gen";
import type { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
    return [
        { title: "Aurora | Negocios Registrados" }
    ];
};

export default function NegociosRegistrados() {
    return (
        <SidebarInset>
            <AppHeader headerTitle="Negocios Registrados"/>
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <BusinessList/>
                </div>
            </div>
        </SidebarInset>
    )
}


function BusinessList() {
    const {accessToken} = useOutletContext<{accessToken: string}>()

    const {data, isLoading, isError, error} = useQuery({
        ...getBusinessesForSupabaseUserOptions({
            headers: {
                'Authorization': `bearer ${accessToken}`
            },
            throwOnError: true
        })
    })

    if (isLoading || data === undefined) return <div className="flex flex-row py-4 px-6 space-x-2">Cargando, un momento por favor...</div>
    if (isError) return <div className="flex flex-row py-4 px-6 space-x-2">{error.message}</div>
    if (!data || data.length === 0) return <div className="flex flex-row py-4 px-6 space-x-2">No cuentas con ningún negocio agregado aún.</div>

    return (
        <div className="flex flex-row py-4 px-6 gap-x-2 gap-y-5 flex-wrap justify-around">
            {
                data.map((business) => {
                    return (
                        <Card key={business.id} className="w-[300px]">
                            <CardHeader>
                                <CardTitle>{business.name}</CardTitle>
                                <CardDescription>{business.created_at}</CardDescription>
                            </CardHeader>
                        </Card>
                    )
                })
            }
        </div>
    )
}