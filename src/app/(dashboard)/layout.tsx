import { notFound } from "next/navigation";
import { dashboardConfig } from "@/config/dashboard";
import { getCurrentUser } from "@/lib/session";
import { MainNav } from "@/components/navbar/main-nav";
import { DashboardNav } from "@/components/navbar/dashboard-nav";
import { SiteFooter } from "@/components/footer/site-footer";
import { UserAccountNav } from "@/components/navbar/user-account-nav";

interface WorkspacesLayoutProps {
  children?: React.ReactNode;
}

export default async function WorkspacesLayout({
  children,
}: WorkspacesLayoutProps) {
  const user = await getCurrentUser();
  if (!user) {
    notFound();
  }
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={dashboardConfig.mainNav} />
          <UserAccountNav
            user={{
              name: user.name,
              image: user.image,
              email: user.email,
            }}
          />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex border-r">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
