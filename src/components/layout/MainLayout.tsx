
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Activity, CircleUser, HardDrive, Home, Network, Settings } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground w-full">
      <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4">
          <NavigationMenu>
            <NavigationMenuList>
              {[
                { icon: Home, label: "Dashboard", path: "/" },
                { icon: Network, label: "Agents", path: "/agents" },
                { icon: Activity, label: "Activities", path: "/activities" },
                { icon: HardDrive, label: "Resources", path: "/resources" },
                { icon: CircleUser, label: "Users", path: "/users" },
                { icon: Settings, label: "Settings", path: "/settings" },
              ].map((item) => (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuLink asChild>
                    <a 
                      href={item.path} 
                      className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      <span>{item.label}</span>
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>
      <main className="container mx-auto p-8">
        {children}
      </main>
    </div>
  );
}
