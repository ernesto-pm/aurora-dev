import { SidebarInset } from "~/components/ui/sidebar";
import AppHeader from "~/routes/app/AppHeader";

export default function Wallet() {
    return (
        <SidebarInset>
            <AppHeader headerTitle="Maneja tu suscripción"/>

            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col py-4 px-6">
                        <span className="font-semibold">Próximamente:</span> Escoge tu suscripción y/o agrega créditos a tu cuenta de Aurora.
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </SidebarInset>
    )
}