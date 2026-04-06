import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  LayoutDashboard,
  Car,
  CalendarDays,
  ClipboardList,
  Settings,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Accueil" },
  { href: "/admin/vehicles", icon: Car, label: "Voitures" },
  { href: "/admin/bookings", icon: ClipboardList, label: "Réservations" },
  { href: "/admin/calendar", icon: CalendarDays, label: "Calendrier" },
  { href: "/admin/settings", icon: Settings, label: "Paramètres" },
];

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar — desktop */}
      <aside className="hidden w-60 flex-col border-r bg-white md:flex">
        <div className="border-b px-6 py-5">
          <h1 className="text-lg font-extrabold text-t8-red">T8 Auto</h1>
          <p className="text-xs text-muted-foreground">Administration</p>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-foreground"
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t p-3">
          <form
            action={async () => {
              "use server";
              const { signOut } = await import("@/lib/auth");
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-foreground"
            >
              <LogOut className="h-5 w-5" />
              Déconnexion
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Mobile top bar */}
        <header className="flex items-center justify-between border-b bg-white px-4 py-3 md:hidden">
          <h1 className="text-lg font-extrabold text-t8-red">T8 Auto</h1>
          <span className="text-xs text-muted-foreground">
            {session.user.email}
          </span>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-8">{children}</main>

        {/* Mobile bottom nav */}
        <nav className="flex border-t bg-white md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-1 flex-col items-center gap-0.5 py-2 text-xs text-gray-500"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
