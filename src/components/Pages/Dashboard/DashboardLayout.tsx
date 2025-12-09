import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Link } from "@tanstack/react-router"

// Menu items.
const items = [
    {
        title: "Products",
        url: "/dashboard/product",

    },
    {
        title: "Categories",
        url: "/dashboard/categories",
    },
    {
        title: "Orders",
        url: "/dashboard/orders",
    },
    {
        title: "Brands",
        url: "/dashboard/brands",
    },
    {
        title: "Users",
        url: "/dashboard/users",
    },
]

interface DashboardLayoutProps {
    children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Application</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu className="mt-10">
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link to={item.url}>
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
            <main className="w-full">
                <SidebarTrigger />
                <div className="p-4">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    )
}
export default DashboardLayout
