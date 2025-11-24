"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

// frElementsNavigationDashboard
// enDashboardNavigationItems
const navItems = [
  { href: "/dashboard", label: "Vue d'ensemble" },
  { href: "/dashboard/faq", label: "FAQ" },
  { href: "/dashboard/assistant", label: "Assistant IA" },
  { href: "/dashboard/widget", label: "Widget" },
  { href: "/dashboard/assistants", label: "Assistants" },
  { href: "/dashboard/settings", label: "Paramètres" },
];

// frLayoutDashboardAvecSidebar
// enDashboardLayoutWithSidebar
export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const assistantId = searchParams.get("assistantId");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="flex">
        {/* frSidebarDashboard */}
        {/* enDashboardSidebar */}
        <aside className="hidden md:flex w-64 flex-col border-r border-slate-800 bg-slate-950/90 px-4 py-6">
          <div className="mb-8">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-slate-950">
                AC
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">
                  AI Contact Center
                </span>
                <span className="text-[11px] text-slate-400">
                  Tableau de bord
                </span>
              </div>
            </div>
          </div>

          <nav className="space-y-1 text-sm">
            {navItems.map((item) => {
              // frCertainesPagesNeDependentPasDeAssistantId
              // enSomePagesDoNotDependOnAssistantId
              const keepPlain =
                item.href === "/dashboard/assistants" ||
                item.href === "/dashboard/settings";

              const href =
                assistantId && !keepPlain
                  ? `${item.href}?assistantId=${encodeURIComponent(
                      assistantId,
                    )}`
                  : item.href;

              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={href}
                  className={
                    "flex items-center rounded-lg px-3 py-2 transition " +
                    (isActive
                      ? "bg-emerald-500 text-slate-950"
                      : "text-slate-300 hover:bg-slate-800 hover:text-slate-50")
                  }
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* frZoneDeContenuDashboard */}
        {/* enDashboardContentArea */}
        <div className="flex-1 min-h-screen bg-slate-950/90">
          {children}
        </div>
      </div>
    </div>
  );
}
