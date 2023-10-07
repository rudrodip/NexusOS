import Link from "next/link";
import { marketingConfig } from "@/config/marketing";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { MainNav } from "@/components/navbar/main-nav";
import { UserAccountNav } from "@/components/navbar/user-account-nav";
import { getCurrentUser } from "@/lib/session";
import { SiteFooter } from "@/components/footer/site-footer";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={marketingConfig.mainNav} />
          <nav>
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className={cn(buttonVariants({ variant: "outline" }), "px-4")}
              >
                Dashboard
              </Link>
              {user && (
                <UserAccountNav
                  user={{
                    name: user.name,
                    image: user.image,
                    email: user.email,
                  }}
                />
              )}
            </div>
          </nav>
        </div>
      </header>
      <main className="flex-1 app">{children}</main>
      <SiteFooter />
    </div>
  );
}
