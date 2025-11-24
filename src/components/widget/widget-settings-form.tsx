"use client";

import { useActionState, useEffect, useState } from "react";
import {
  updateWidgetConfig,
  type UpdateWidgetState,
} from "@/app/dashboard/widget/actions";

// frPropsFormulaireWidget
// enWidgetSettingsFormProps
type WidgetSettingsFormProps = {
  // frAssistantLieAuWidget
  // enAssistantLinkedToWidget
  assistantId: string;
  initialButtonText: string;
  initialPrimaryColor: string;
  initialBackgroundColor: string;
  embedCode: string;
};

const initialState: UpdateWidgetState = {
  // frEtatInitialRetourAction
  // enInitialActionReturnState
  success: false,
  message: "",
};

// frFormulaireConfigurationWidgetAvecPreview
// enWidgetConfigurationFormWithPreview
export function WidgetSettingsForm({
  assistantId,
  initialButtonText,
  initialPrimaryColor,
  initialBackgroundColor,
  embedCode,
}: WidgetSettingsFormProps) {
  const [state, formAction] = useActionState<UpdateWidgetState, FormData>(
    updateWidgetConfig,
    initialState,
  );

  // frEtatsLocauxPourPrevisualisation
  // enLocalStateForPreview
  const [buttonText, setButtonText] = useState(initialButtonText);
  const [primaryColor, setPrimaryColor] = useState(initialPrimaryColor);
  const [backgroundColor, setBackgroundColor] = useState(
    initialBackgroundColor,
  );

  const [flashMessage, setFlashMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!state.message) return;
    setFlashMessage(state.message);
    const timeout = setTimeout(() => setFlashMessage(null), 2500);
    return () => clearTimeout(timeout);
  }, [state.message]);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.3fr)]">
      {/* ================= FORMULAIRE ================= */}
      <form
        action={formAction}
        className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-5"
      >
        <input type="hidden" name="assistantId" value={assistantId} />

        <div className="space-y-1">
          <h2 className="text-sm font-semibold">Configuration du widget</h2>
          <p className="text-xs text-slate-400">
            Personnalisez l&apos;apparence du bouton et de la fenêtre de chat
            qui apparaîtra sur votre site.
          </p>
        </div>

        <div className="space-y-4">
          {/* frTexteBoutonFlottant */}
          {/* enFloatingButtonText */}
          <div className="space-y-1">
            <label
              htmlFor="buttonText"
              className="text-xs font-medium text-slate-300"
            >
              Texte du bouton flottant
            </label>
            <input
              id="buttonText"
              name="buttonText"
              type="text"
              value={buttonText}
              onChange={(event) => setButtonText(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Ex : Besoin d'aide ?"
            />
          </div>

          {/* frCouleurPrincipaleBouton */}
          {/* enPrimaryColorButton */}
          <div className="space-y-1">
            <label
              htmlFor="primaryColor"
              className="text-xs font-medium text-slate-300"
            >
              Couleur principale (bouton)
            </label>
            <input
              id="primaryColor"
              name="primaryColor"
              type="text"
              value={primaryColor}
              onChange={(event) => setPrimaryColor(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="#10B981"
            />
          </div>

          {/* frCouleurFondFenetre */}
          {/* enWindowBackgroundColor */}
          <div className="space-y-1">
            <label
              htmlFor="backgroundColor"
              className="text-xs font-medium text-slate-300"
            >
              Couleur de fond de la fenêtre
            </label>
            <input
              id="backgroundColor"
              name="backgroundColor"
              type="text"
              value={backgroundColor}
              onChange={(event) => setBackgroundColor(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="#020617"
            />
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-60"
        >
          Enregistrer
        </button>

        {flashMessage && (
          <p
            className={
              "text-[11px] " +
              (state.success ? "text-emerald-400" : "text-red-400")
            }
          >
            {flashMessage}
          </p>
        )}
      </form>

      {/* ================= PRÉVISUALISATION ================= */}
      <section className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
        <div className="space-y-1">
          <h2 className="text-sm font-semibold">Prévisualisation</h2>
          <p className="text-xs text-slate-400">
            Aperçu simplifié de l&apos;aspect du widget sur votre site. Le
            rendu final dépendra du thème de votre site, mais la position et le
            comportement restent similaires.
          </p>
        </div>

        {/* frPreviewFenetreChat */}
        {/* enChatWindowPreview */}
        <div className="mx-auto mt-2 flex max-w-sm flex-col gap-0 rounded-3xl bg-slate-950/80 p-4 shadow-2xl shadow-black/60">
          <div
            className="flex items-center justify-between rounded-2xl px-4 py-2 text-xs font-semibold text-slate-50"
            style={{ backgroundColor }}
          >
            <div className="flex flex-col">
              <span>Assistant par défaut</span>
              <span className="text-[11px] font-normal text-slate-200/80">
                Réponses basées sur votre FAQ.
              </span>
            </div>
            <div className="h-2 w-2 rounded-full bg-emerald-400" />
          </div>

          <div className="mt-2 space-y-2 rounded-2xl bg-slate-900/90 px-4 py-3 text-xs">
            <div className="mr-auto max-w-[80%] rounded-2xl bg-slate-800 px-3 py-2 text-slate-50">
              Bonjour, comment pouvons-nous vous aider ?
            </div>
            <div
              className="ml-auto max-w-[80%] rounded-2xl px-3 py-2 text-slate-950"
              style={{ backgroundColor: primaryColor }}
            >
              Quels sont vos délais de livraison ?
            </div>
          </div>

          <div className="mt-2 flex items-center gap-2 rounded-2xl bg-slate-900 px-3 py-2 text-xs">
            <div className="flex-1 rounded-lg bg-slate-950/80 px-3 py-2 text-slate-500">
              Écrivez un message...
            </div>
            <div
              className="flex h-7 w-7 items-center justify-center rounded-full text-slate-50"
              style={{ backgroundColor: primaryColor }}
            >
              ●
            </div>
          </div>
        </div>

        {/* frBlocCodeIntegration */}
        {/* enEmbedCodeBlock */}
        <div className="space-y-1">
          <p className="text-xs font-medium text-slate-300">
            Code d&apos;intégration
          </p>
          <p className="text-[11px] text-slate-500">
            Collez ce script juste avant la balise &lt;/body&gt; de votre site.
          </p>
          <textarea
            readOnly
            className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-[11px] text-slate-200"
            rows={3}
            value={embedCode}
          />
        </div>
      </section>
    </div>
  );
}
