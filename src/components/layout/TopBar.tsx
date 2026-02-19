import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Menu, LogOut, User as UserIcon, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { GlobalSearch } from '@/components/search/GlobalSearch';

export function TopBar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);

  // ---- Safe derived fields (Supabase-friendly) ----
  const email =
    (user as any)?.email ||
    (user as any)?.user?.email || // in case your context wraps supabase session.user
    '';

  const meta =
    (user as any)?.user_metadata ||
    (user as any)?.user?.user_metadata ||
    {};

  const displayName =
    meta?.full_name ||
    meta?.name ||
    (email ? email.split('@')[0] : '') ||
    'User';

  const avatarUrl =
    meta?.avatar_url ||
    meta?.picture ||
    ''; // leave blank if none

  const initial = (displayName?.trim()?.[0] || 'U').toUpperCase();
  // -----------------------------------------------

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
      <SidebarTrigger className="lg:hidden">
        <Menu className="h-5 w-5" />
      </SidebarTrigger>

      <div className="flex-1 flex items-center gap-4">
        <GlobalSearch />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
            3
          </span>
        </Button>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={avatarUrl} alt={displayName} />
                  <AvatarFallback>{initial}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56 bg-popover" align="end" forceMount>
              <div className="flex flex-col space-y-1 p-2">
                <p className="text-sm font-medium">{displayName}</p>
                <p className="text-xs text-muted-foreground">{email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                <UserIcon className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild size="sm">
            <Link to="/login">Login</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
