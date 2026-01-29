import { useLocation } from 'react-router-dom';
import {
  Home,
  BookOpen,
  FileText,
  FolderOpen,
  Brain,
  Users,
  Upload,
  LogIn,
  GraduationCap
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';

const mainNavItems = [
  { title: 'Home', url: '/', icon: Home },
  { title: 'Modules', url: '/modules', icon: BookOpen },
  { title: 'Notes', url: '/notes', icon: FileText },
  { title: 'Past Papers', url: '/papers', icon: FolderOpen },
  { title: 'Practice', url: '/practice', icon: Brain },
];

const communityItems = [
  { title: 'Study Groups', url: '/groups', icon: Users },
  { title: 'Upload', url: '/upload', icon: Upload },
];

export function AppSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const { user } = useAuth();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="p-4">
        <NavLink to="/" className="flex items-center gap-2 text-sidebar-foreground hover:text-sidebar-primary-foreground">
          <GraduationCap className="h-6 w-6 text-sidebar-primary" />
          {!collapsed && (
            <span className="font-bold text-lg">IMC Study Hub</span>
          )}
        </NavLink>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">
            {!collapsed && 'Main'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                  >
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground"
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">
            {!collapsed && 'Community'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {communityItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                  >
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground"
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        {!user && (
          <SidebarMenuButton asChild tooltip="Login">
            <NavLink
              to="/login"
              className="flex items-center gap-3 text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <LogIn className="h-4 w-4" />
              {!collapsed && <span>Login</span>}
            </NavLink>
          </SidebarMenuButton>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
