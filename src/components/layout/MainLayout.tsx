import { ReactNode, useEffect } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { TopBar } from './TopBar';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  useEffect(() => {
    const preventDefaults = (event: DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
    };

    window.addEventListener('dragover', preventDefaults);
    window.addEventListener('drop', preventDefaults);

    return () => {
      window.removeEventListener('dragover', preventDefaults);
      window.removeEventListener('drop', preventDefaults);
    };
  }, []);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex flex-col flex-1">
          <TopBar />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
          <footer className="border-t py-4 px-6 text-center text-sm text-muted-foreground">
            Community-made demo. Not affiliated with IMC.
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
