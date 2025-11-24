"use client";

import { useActionState, useEffect } from "react";
import { updateAssistantSettings } from "@/app/dashboard/assistant/actions";

// frEtatRetourActionAssistant
// enAssistantActionReturnState
type UpdateAssistantState = {
  success: boolean;
  message: string;
};

type AssistantSettingsFormProps = {
  // frIdentifiantAssistant
  // enAssistantIdentifier
  assistantId: string;

  // frValeursInitialesDuFormulaire
  // enInitialFormValues
  initialName: string;
  initialDescription: string;
  initialLanguage: string;
  initialTone: string;
  initialSystemInstructions: string;
};

const initialState: UpdateAssistantState = {
  success: false,
  message: "",
};

// frFormulaireConfigurationAssistant
// enAssistantConfigurationForm
export function AssistantSettingsForm({
  assistantId,
  initialName,
  initialDescription,
  initialLanguage,
  initialTone,
  initialSystemInstructions,
}: AssistantSettingsFormProps) {
  const [state, formAction] = useActionState<UpdateAssistantState, FormData>(
    updateAssistantSettings,
    initialState,
  );

  const { success, message } = state;

  useEffect(() => {
    if (!message) return;
    const timeout = setTimeout(() => {
      // frNettoyageMessageFlash
      // enCleanupFlashMessage
    }, 2500);
    return () => clearTimeout(timeout);
  }, [message]);

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-5"
    >
      <input type="hidden" name="assistantId" value={assistantId} />

      <div className="space-y-1">
        <h2 className="text-sm font-semibold">Configuration de l&apos;assistant</h2>
        <p className="text-xs text-slate-400">
          Personnalisez le nom, la langue, le ton et les instructions système
          utilisées par cet assistant IA.
        </p>
      </div>

      {/* frNomAssistant */}
      {/* enAssistantName */}
      <div className="space-y-1">
        <label
          htmlFor="name"
          className="text-xs font-medium text-slate-300"
        >
          Nom de l&apos;assistant
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={initialName}
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Ex : Assistant site FR"
        />
      </div>

      {/* frDescriptionInterne */}
      {/* enInternalDescription */}
      <div className="space-y-1">
        <label
          htmlFor="description"
          className="text-xs font-medium text-slate-300"
        >
          Description (interne)
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={initialDescription}
          className="h-20 w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Ex : Assistant IA connecté à votre base de connaissances."
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {/* frLanguePrincipale */}
        {/* enMainLanguage */}
        <div className="space-y-1">
          <label
            htmlFor="language"
            className="text-xs font-medium text-slate-300"
          >
            Langue principale
          </label>
          <select
            id="language"
            name="language"
            defaultValue={initialLanguage}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="fr">Français</option>
            <option value="en">Anglais</option>
          </select>
        </div>

        {/* frTonAssistant */}
        {/* enAssistantTone */}
        <div className="space-y-1">
          <label
            htmlFor="tone"
            className="text-xs font-medium text-slate-300"
          >
            Ton de l&apos;assistant
          </label>
          <select
            id="tone"
            name="tone"
            defaultValue={initialTone}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="neutral">Neutre</option>
            <option value="warm">Chaleureux</option>
            <option value="formal">Formel</option>
          </select>
        </div>
      </div>

      {/* frInstructionsSystemeAvancees */}
      {/* enAdvancedSystemInstructions */}
      <div className="space-y-1">
        <label
          htmlFor="instructions"
          className="text-xs font-medium text-slate-300"
        >
          Instructions système (avancé)
        </label>
        <textarea
          id="instructions"
          name="instructions"
          defaultValue={initialSystemInstructions}
          className="h-32 w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Décrivez le rôle, les limites et le ton de l'assistant..."
        />
        <p className="text-[11px] text-slate-500">
          Ces instructions sont ajoutées au prompt système avant chaque réponse
          de l&apos;assistant.
        </p>
      </div>

      <button
        type="submit"
        className="inline-flex items-center rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-60"
      >
        Enregistrer
      </button>

      {message && (
        <p
          className={
            "text-[11px] " +
            (success ? "text-emerald-400" : "text-red-400")
          }
        >
          {message}
        </p>
      )}
    </form>
  );
}
