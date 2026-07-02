import { BugHighlighter } from '@/components/BugScanner/BugHighlighter';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Link, useLocation } from '@tanstack/react-router';
import {
  Package,
  Layers,
  ClipboardList,
  Bookmark,
  Users,
  TicketPercent,
  ShieldCheck,
} from 'lucide-react';

// Menu items with icons.
const items = [
  {
    title: 'Products',
    url: '/dashboard/product',
    icon: Package,
  },
  {
    title: 'Categories',
    url: '/dashboard/categories',
    icon: Layers,
  },
  {
    title: 'Orders',
    url: '/dashboard/orders',
    icon: ClipboardList,
  },
  {
    title: 'Brands',
    url: '/dashboard/brands',
    icon: Bookmark,
  },
  {
    title: 'Users',
    url: '/dashboard/users',
    icon: Users,
  },
  {
    title: 'Promo Codes',
    url: '/dashboard/promo-codes',
    icon: TicketPercent,
  },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-gray-100  bg-white">
        <SidebarContent className="bg-white ">
          {/* Sidebar Header Title */}
          <div className="p-5 border-b border-gray-100 flex items-center gap-3 mt-4">
            <div className="bg-plate-1 p-2 rounded-lg text-plate-7">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base text-gray-800 leading-tight">Admin Portal</h2>
              <span className="text-xs text-gray-400">Management Hub</span>
            </div>
          </div>

          <SidebarGroup className="p-4">
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1.5">
                {items.map((item) => {
                  const isActive = location.pathname.startsWith(item.url);
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 select-none
                          ${
                            isActive
                              ? 'bg-plate-7 text-white font-bold shadow-md hover:bg-plate-7 hover:text-white'
                              : 'text-gray-600 hover:bg-plate-1 hover:text-plate-7'
                          }`}
                      >
                        <Link to={item.url}>
                          <Icon
                            className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-gray-500' : 'text-gray-400 group-hover:text-plate-7'}`}
                          />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main className="flex-1 min-w-0 bg-gray-50/50 min-h-svh">
        {/* Top Header Bar with Trigger */}
        <div className="bg-white border-b border-gray-100 px-6 py-3 mt-9 flex items-center gap-4">
          <SidebarTrigger className="p-1.5 bg-gray-50 rounded-md border border-gray-200 shadow-sm hover:bg-gray-100 transition-colors" />
        </div>
        <div className="p-6">
          <BugHighlighter id="dashboardBug" className="w-full" bugName="Broken Access control">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm">{children}</div>
          </BugHighlighter>
        </div>
      </main>
    </SidebarProvider>
  );
};
export default DashboardLayout;
