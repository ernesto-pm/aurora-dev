import { SidebarInset } from "~/components/ui/sidebar";
import AppHeader from "~/routes/app/AppHeader";
import type { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
    return [
        { title: "Aurora | Negocios Registrados" }
    ];
};

export default function ConexionDeDatos() {
    return (
        <SidebarInset>
            <AppHeader headerTitle="Conexión de datos"/>
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div>
                        En construcción
                    </div>
                </div>
            </div>
        </SidebarInset>
    )
}

