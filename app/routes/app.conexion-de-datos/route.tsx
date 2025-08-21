import { SidebarInset } from "~/components/ui/sidebar";
import AppHeader from "~/routes/app/AppHeader";
import type { MetaFunction } from "@remix-run/cloudflare";
import {useOutletContext} from "@remix-run/react";
import {useQuery} from "@tanstack/react-query";
import {
    getBusinessesDataConnectionsForSupabaseUserOptions
} from "~/services/aurora/@tanstack/react-query.gen";

import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";


export const meta: MetaFunction = () => {
    return [
        { title: "Aurora | Conexiónes de datos" }
    ];
};

export default function DataConnection() {
    return (
        <SidebarInset>
            <AppHeader headerTitle="Conexiónes de datos"/>

            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <DataConnectionList />
                </div>
            </div>
        </SidebarInset>
    )
}

function DataConnectionList() {
    const {accessToken} = useOutletContext<{accessToken: string}>()

    const {data, isLoading, isError, error} = useQuery({
        ...getBusinessesDataConnectionsForSupabaseUserOptions({
            headers: {
                'Authorization': `bearer ${accessToken}`
            },
            throwOnError: true
        })
    })

    if (isLoading || data === undefined) return <div className="flex flex-row py-4 px-6 space-x-2">Cargando, un momento por favor...</div>
    if (isError) return <div className="flex flex-row py-4 px-6 space-x-2">{error.message}</div>
    if (!data || data.length === 0) return <div className="flex flex-row py-4 px-6 space-x-2">No cuentas con ningúna conexión de datos aun.</div>

    return (
        <div className="flex flex-row py-4 px-6 gap-x-2 gap-y-5 flex-wrap">
            {
                data.map((dataSourceConnection) => (
                    <Card key={dataSourceConnection.connection_id} className="min-w-[300px]">
                        <CardHeader>
                            <CardTitle>{dataSourceConnection.data_source_display_name}</CardTitle>
                            <CardDescription className="tex-sm">
                                <div>
                                    Conectado con: {dataSourceConnection.business_name}
                                </div>
                                <div>
                                    Estatus: {dataSourceConnection.is_data_source_active && "activo"} {!dataSourceConnection.is_data_source_active && "desactivado"}
                                </div>

                            </CardDescription>
                        </CardHeader>
                    </Card>
                ))
            }
        </div>
    )
}
