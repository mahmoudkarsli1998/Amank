"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, FileText, Settings, Car } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar'; // Assuming sidebar.tsx is correctly set up
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const adminNavItems = [
  { href: '/admin/dashboard', label: 'لوحة التحكم الرئيسية', icon: Settings },
  { href: '/admin/leads', label: 'العملاء المحتملون', icon: Users },
  { href: '/admin/content', label: 'إدارة المحتوى', icon: FileText },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider defaultOpen>
      <Sidebar>
        <SidebarHeader className="flex flex-col items-center p-4 border-b border-sidebar-border">
           <Link href="/" className="flex items-center gap-2 mb-4">
              <Car className="h-8 w-8 text-sidebar-primary" />
              <span className="text-2xl font-semibold leading-tight tracking-[-0.025em] font-bold text-sidebar-primary group-data-[collapsible=icon]:hidden">أمانك أونلاين</span>
           </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {adminNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label, side: 'right' }}
                >
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2 border-t border-sidebar-border">
           <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={{ children: "العودة للموقع", side: 'right' }}>
                <Link href="/">
                  <Home className="h-5 w-5" />
                  <span className="group-data-[collapsible=icon]:hidden">العودة للموقع</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
           </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-slate-900/20/10 px-4 sm:px-6">
            <div className="md:hidden">
                 <SidebarTrigger />
            </div>
            <div className="flex-1">
                {/* Can add breadcrumbs or page title here */}
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="https://placehold.co/40x40.png" alt="Admin" data-ai-hint="user avatar" />
                            <AvatarFallback>م</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>حسابي</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>الملف الشخصي</DropdownMenuItem>
                    <DropdownMenuItem>الإعدادات</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>تسجيل الخروج</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
        <main className="flex-1 p-6 bg-slate-800/20/30/40">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
