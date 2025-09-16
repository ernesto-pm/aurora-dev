import {SidebarTrigger} from "~/components/ui/sidebar";
import {Separator} from "~/components/ui/separator";

interface AppNavigationHeaderProptypes {
    headerTitle: string
}

export default function AppNavigationHeader(props: AppNavigationHeaderProptypes) {
    return (
        <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mr-2 h-4"
                />
                <h1 className="text-base font-medium">{props.headerTitle}</h1>
            </div>
        </header>
    )
}