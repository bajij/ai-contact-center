"use client"; // frComposantCoteClientPourUtiliserHooksNext
              // enClientSideComponentToUseNextHooks

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// frElementsNavigationDashboard
// enDashboardNavigationItems
const navItems = [
  { href: "/dashboard", label: "Vue d'ensemble" },
  { href: "/dashboard/faq", label: "FAQ" },
  { href: "/dashboard/assistant", label: "Assistant IA" },
  { href: "/dashboard/widget", label: "Widget" },
  { href: "/dashboard/settings", label: "Paramètres" },
];

interface DashboardShellProps {
  // frContenuPrincipalAInsererDansLeDashboard
  // enMainContentToRenderInsideDashboard
  children: ReactNode;
}

// frDispositionGeneraleDashboardAvecSidebar
// enMainDashboardLayoutWithSidebar
export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex">
      {/* frZoneSidebarNavigation */}
      {/* enSidebarNavigationArea */}
      <aside className="w-64 border-r border-slate-800 bg-slate-950/80 px-4 py-6 flex flex-col gap-6">
        {/* frLogoEtNomApplication */}
        {/* enAppLogoAndName */}
        <div>
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-slate-950 font-semibold">
            AC
          </div>
          <h1 className="mt-3 text-lg font-semibold tracking-tight">
            AI Contact Center
          </h1>
          <p className="text-xs text-slate-400">
            Tableau de bord / Dashboard
          </p>
        </div>

        {/* frMenuNavigationPrincipal */}
        {/* enMainNavigationMenu */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-emerald-500 text-slate-950"
                    : "text-slate-200 hover:bg-slate-800 hover:text-slate-50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* frLienRetourAccueilMarketing */}
        {/* enBackToMarketingHomeLink */}
        <Link
          href="/"
          className="text-xs text-slate-400 hover:text-slate-200 transition"
        >
          ← Retour à la page d&apos;accueil
        </Link>
      </aside>

      {/* frZoneContenuPrincipalDashboard */}
      {/* enMainDashboardContentArea */}
      <div className="flex-1 flex flex-col">
        {/* frBarreSuperieureDashboard */}
        {/* enDashboardTopBar */}
        <header className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Espace admin
            </p>
            <h2 className="text-lg font-semibold">Tableau de bord</h2>
          </div>

          {/* frZoneProfilUtilisateurPlaceholder */}
          {/* enUserProfilePlaceholderArea */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium">Utilisateur démo</p>
              <p className="text-xs text-slate-400">demo@example.com</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-xs">
              U
            </div>
          </div>
        </header>

        {/* frZoneContenuPagesDashboard */}
        {/* enDashboardPagesContentArea */}
        <main className="flex-1 overflow-y-auto px-6 py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
