import { SidebarInset } from "~/components/ui/sidebar";
import AppNavigationHeader from "~/routes/app/AppNavigationHeader";

export default function Profile() {
    return (
        <div>
            <AppNavigationHeader headerTitle="Perfil"/>

            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col py-4 px-6">
                        En construcción.
                    </div>
                </div>
            </div>
        </div>
    )
}