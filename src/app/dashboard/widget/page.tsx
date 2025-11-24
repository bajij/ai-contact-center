// frPageDashboardWidgetMultiAssistant
// enDashboardWidgetPageMultiAssistant

import { prisma } from "@/lib/prisma";
import { getAssistantByIdOrDefault } from "@/lib/assistant";
import { WidgetSettingsForm } from "@/components/widget/widget-settings-form";

type PageProps = {
  // frSearchParamsPromessePourReact19
  // enSearchParamsPromiseForReact19
  searchParams: Promise<{
    assistantId?: string;
  }>;
};

// frPageConfigurationWidgetPourAssistant
// enWidgetConfigurationPageForAssistant
export default async function DashboardWidgetPage({
  searchParams,
}: PageProps) {
  const { assistantId } = await searchParams;

  const assistant = await getAssistantByIdOrDefault(assistantId);

  const widgetConfig = await prisma.widgetConfig.findUnique({
    where: { assistantId: assistant.id },
  });

  const buttonText = widgetConfig?.buttonText ?? "Besoin d'aide ?";
  const primaryColor = widgetConfig?.primaryColor ?? "#10b981";
  const backgroundColor = widgetConfig?.backgroundColor ?? "#020617";

  const baseUrl =
    process.env.NEXT_PUBLIC_APP_BASE_URL ?? "http://localhost:3000";

  const embedCode = `<script src="${baseUrl}/widget.js" data-assistant-id="${assistant.id}"></script>`;

  return (
    <main className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      <header className="space-y-1">
        <p className="text-xs font-semibold text-emerald-400">
          Espace admin
        </p>
        <h1 className="text-xl font-semibold">Widget</h1>
        <p className="text-sm text-slate-400">
          Configurez le widget de chat à intégrer sur votre site pour ce
          assistant.
        </p>
      </header>

      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-1">
        <p className="text-xs text-slate-300">
          Assistant courant :{" "}
          <span className="font-semibold">{assistant.name}</span>
        </p>
        <p className="text-[11px] text-slate-500">
          Le code d&apos;intégration ci-dessous est spécifique à cet
          assistant.
        </p>
      </section>

      <WidgetSettingsForm
        assistantId={assistant.id}
        initialButtonText={buttonText}
        initialPrimaryColor={primaryColor}
        initialBackgroundColor={backgroundColor}
        embedCode={embedCode}
      />
    </main>
  );
}
