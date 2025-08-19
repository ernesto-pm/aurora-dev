import AppHeader from "~/routes/app/AppHeader";
import {SidebarInset} from "~/components/ui/sidebar";

export default function AppIndex() {
    return (
        <SidebarInset>
            <AppHeader headerTitle="Bienvenido/a a Aurora."/>

            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        {Array.from({ length: 24 }).map((_, index) => (
                            <div
                                key={index}
                                className="bg-muted/50 aspect-video h-12 w-full rounded-lg"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </SidebarInset>
    )
}