import {
    Bot,
    Cable,
    ChevronUp,
    Circle,
    LayoutDashboard,
    LogOut,
    NotebookPen,
    NotebookTabs, PiggyBank, SquareUser,
    User2,
    WalletCards, WalletMinimal
} from "lucide-react"
import {
    Sidebar,
    SidebarContent, SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel, SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "~/components/ui/sidebar"
import {Link} from "@remix-run/react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "~/components/ui/dropdown-menu";
import {SupabaseClient, User} from "@supabase/supabase-js"
import {Database} from "~/services/supabase/database.types";

// Menu items.
const businessMenuMapping = [
    {
        title: "Registra tu negocio",
        url: "/app/registro-negocio",
        icon: NotebookPen,
    },
    {
        title: "Tus negocios",
        url: "/app/negocios-registrados",
        icon: NotebookTabs,
    },
    {
        title: "Conecta tus datos",
        url: "/app/conexion-de-datos",
        icon: Cable,
    }
]

const auroraMenuMapping = [
    {
        title: "Centro de control",
        url: "/app/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Pregúntale a Aurora",
        url: "/app/chat",
        icon: Bot,
    },
]

const userMenuMapping = [
    {
        title: "Tu Suscripción",
        url: "/app/wallet",
        icon: WalletMinimal,
    },
    {
        title: "Tu Perfil",
        url: "/app/profile",
        icon: SquareUser,
    },
]

interface PropTypes {
    user: User
    supabase: SupabaseClient<Database>
}

export function AppSidebar(props: PropTypes) {

    async function handleSignOut() {
        const {error} = await props.supabase.auth.signOut()
        console.error(error)
    }

    return (

        <Sidebar variant="inset">
            <SidebarHeader className="h-14">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <Link to="/app">
                                <img src="/auroraLogo.png" className="h-7" alt="aurora-logo"/>
                                <span className="text-base font-semibold">Aurora A.I.</span>
                                <span className="text-xs text-muted-foreground">alpha</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>

                <SidebarGroup>
                    <SidebarGroupLabel>Tu negocio</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {businessMenuMapping.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Aurora</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {auroraMenuMapping.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>


                <SidebarGroup>
                    <SidebarGroupLabel>Usuario</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {userMenuMapping.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <User2 /> {props.user.email}
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <DropdownMenuItem onClick={handleSignOut}>
                                    <LogOut/>
                                    <span>Cerrar Sesión</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}