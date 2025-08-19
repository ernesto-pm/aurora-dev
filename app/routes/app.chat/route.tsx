import { SidebarInset } from "~/components/ui/sidebar";
import AppHeader from "~/routes/app/AppHeader";
import type { MetaFunction } from "@remix-run/cloudflare";


export const meta: MetaFunction = () => {
    return [
        { title: "Aurora | Preguntale a Aurora" }
    ];
};

export default function Chat() {
    return (
        <SidebarInset>

            <AppHeader headerTitle="Preguntale a Aurora"/>

            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    En construccion...
                </div>
            </div>
        </SidebarInset>
    )
}