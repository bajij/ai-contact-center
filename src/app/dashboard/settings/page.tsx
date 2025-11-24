// frPageParametresCompteApplication
// enApplicationAccountSettingsPage

export default function DashboardSettingsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Paramètres</h1>
        <p className="text-sm text-slate-300">
          Gérez les paramètres de votre compte et les options générales de
          l&apos;application.
        </p>
      </div>

      <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/40 p-6">
        <p className="text-sm text-slate-400">
          Les paramètres utilisateur (profil, sécurité, préférences) seront
          configurables ici.
        </p>
      </div>
    </div>
  );
}
