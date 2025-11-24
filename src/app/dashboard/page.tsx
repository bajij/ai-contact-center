// frPageDashboardVueEnsembleMultiAssistant
// enDashboardOverviewPageMultiAssistant

import { prisma } from "@/lib/prisma";
import { getAssistantByIdOrDefault } from "@/lib/assistant";

type PageProps = {
  // frReact19SearchParamsEstUnePromesse
  // enReact19SearchParamsIsAPromise
  searchParams: Promise<{
    assistantId?: string;
  }>;
};

// frPageDashboardVueEnsemblePourUnAssistant
// enDashboardOverviewPageForOneAssistant
export default async function DashboardPage({ searchParams }: PageProps) {
  const { assistantId } = await searchParams;

  const assistant = await getAssistantByIdOrDefault(assistantId);

  // frCompterLesElementsRelatifsAAssistant
  // enCountEntitiesRelatedToAssistant
  const [faqCount, widgetConfig] = await Promise.all([
    prisma.faqItem.count({
      where: { assistantId: assistant.id },
    }),
    prisma.widgetConfig.findUnique({
      where: { assistantId: assistant.id },
    }),
  ]);

  const widgetReady = !!widgetConfig;

  return (
    <main className="max-w-5xl mx-auto py-8 px-4 space-y-8">
      <header className="space-y-1">
        <p className="text-xs font-semibold text-emerald-400">
          Espace admin
        </p>
        <h1 className="text-xl font-semibold">Vue d&apos;ensemble</h1>
        <p className="text-sm text-slate-400">
          Aperçu rapide de votre assistant, de votre base de
          connaissances et des prochaines actions à réaliser.
        </p>
      </header>

      {/* frCarteAssistantActuel */}
      {/* enCurrentAssistantCard */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-2">
        <p className="text-xs font-medium text-slate-300">
          Assistant actuel
        </p>
        <h2 className="text-lg font-semibold">{assistant.name}</h2>
        <p className="text-xs text-slate-400">
          Assistant IA connecté à votre base de connaissances (configuration
          initiale).
        </p>
        <p className="text-xs text-slate-400">
          Langue : <span className="font-medium">{assistant.language}</span>{" "}
          · Ton : <span className="font-medium">{assistant.tone}</span>
        </p>
      </section>

      {/* frCartesStatistiquesRapides */}
      {/* enQuickStatsCards */}
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
          <p className="text-xs font-medium text-slate-400">
            Questions dans la FAQ
          </p>
          <p className="text-3xl font-semibold">{faqCount}</p>
          <p className="text-[11px] text-slate-500">
            Ajoutez vos questions/réponses dans l&apos;onglet &quot;FAQ&quot;.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
          <p className="text-xs font-medium text-slate-400">
            Conversations IA
          </p>
          <p className="text-3xl font-semibold">0</p>
          <p className="text-[11px] text-slate-500">
            Le suivi des conversations sera ajouté ultérieurement.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
          <p className="text-xs font-medium text-slate-400">
            Statut du widget
          </p>
          <p className="text-3xl font-semibold">
            {widgetReady ? "Prêt" : "À configurer"}
          </p>
          <p className="text-[11px] text-slate-500">
            Le script d&apos;intégration est disponible dans l&apos;onglet
            &quot;Widget&quot;.
          </p>
        </div>
      </section>
    </main>
  );
}
