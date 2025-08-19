import {Bot, Cable, Circle, LayoutDashboard, NotebookPen, NotebookTabs} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel, SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "~/components/ui/sidebar"
import {Link} from "@remix-run/react";

// Menu items.
const businessMenuMapping = [
    {
        title: "Registra tú negocio",
        url: "/app/registro-negocio",
        icon: NotebookPen,
    },
    {
        title: "Tús negocios",
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
        title: "Platica con tú asistente",
        url: "/app/registro-negocio",
        icon: Bot,
    },
    {
        title: "Consulta tu dashboard",
        url: "/app/registro-negocio",
        icon: LayoutDashboard,
    },
]

export function AppSidebar() {
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
                                <img src="/auroraLogo.png" className="h-7"/>
                                <span className="text-base font-semibold">Aurora A.I.</span>
                                <span className="text-xs text-muted-foreground">alpha</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>

                <SidebarGroup>
                    <SidebarGroupLabel>Tú negocio</SidebarGroupLabel>
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
            </SidebarContent>
        </Sidebar>
    )
}