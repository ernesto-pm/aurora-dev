import { SidebarInset } from "~/components/ui/sidebar";
import AppHeader from "~/routes/app/AppHeader";

export default function NegociosRegistrados() {
    return (
        <SidebarInset>
            <AppHeader headerTitle="Negocios Registrados"/>

            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col py-4 px-6">

                    </div>
                </div>
            </div>
        </SidebarInset>
    )
}