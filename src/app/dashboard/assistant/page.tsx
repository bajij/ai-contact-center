// frPageDashboardAssistantMultiAssistant
// enDashboardAssistantPageMultiAssistant

import { getAssistantByIdOrDefault } from "@/lib/assistant";
import { AssistantSettingsForm } from "@/components/assistant/assistant-settings-form";
import { AssistantTestPanel } from "@/components/assistant/assistant-test-panel";

type PageProps = {
  // frSearchParamsEstUnePromesseReact19
  // enSearchParamsIsPromiseReact19
  searchParams: Promise<{
    assistantId?: string;
  }>;
};

// frPageConfigurationAssistantPourUnAssistant
// enAssistantConfigurationPageForOneAssistant
export default async function DashboardAssistantPage({
  searchParams,
}: PageProps) {
  const { assistantId } = await searchParams;

  const assistant = await getAssistantByIdOrDefault(assistantId);

  return (
    <main className="max-w-6xl mx-auto py-8 px-4 space-y-8">
      <header className="space-y-1">
        <p className="text-xs font-semibold text-emerald-400">
          Espace admin
        </p>
        <h1 className="text-xl font-semibold">Assistant IA</h1>
        <p className="text-sm text-slate-400">
          Configurez et testez votre assistant IA basé sur la FAQ de votre
          espace. Chaque assistant a ses propres réglages.
        </p>
      </header>

      {/* frGrilleConfigurationEtTestAssistant */}
      {/* enGridAssistantConfigAndTest */}
      <section className="grid gap-6 lg:grid-cols-2">
        <AssistantSettingsForm
  assistantId={assistant.id}
  initialName={assistant.name}
  initialDescription={assistant.description ?? ""}
  initialLanguage={assistant.language}
  initialTone={assistant.tone}
  initialSystemInstructions={assistant.instructions ?? ""}
/>


        <AssistantTestPanel assistantId={assistant.id} />
      </section>
    </main>
  );
}
