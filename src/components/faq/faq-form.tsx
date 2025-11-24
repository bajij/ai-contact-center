// frFormulaireClientCreationFaq
// enClientFaqCreationForm

"use client";

import { useActionState } from "react";

import {
  createFaqItem,
  type CreateFaqState,
} from "@/app/dashboard/faq/actions";

const initialState: CreateFaqState = {
  ok: false,
};

// frPropsFormulaireFaqAvecAssistantId
// enFaqFormPropsIncludingAssistantId
interface FaqFormProps {
  assistantId: string;
}

// frFormulaireCreationEntreeFaqPourAssistant
// enFormToCreateFaqEntryForAssistant
export function FaqForm({ assistantId }: FaqFormProps) {
  const [state, formAction] = useActionState<CreateFaqState, FormData>(
    createFaqItem,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4">
      {/* frAssistantIdCachePourServerAction */}
      {/* enHiddenAssistantIdForServerAction */}
      <input type="hidden" name="assistantId" value={assistantId} />

      <div className="space-y-1">
        <label
          htmlFor="question"
          className="text-xs font-medium text-slate-200"
        >
          Question
        </label>
        <input
          id="question"
          name="question"
          type="text"
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          placeholder="Ex : Quels sont vos délais de livraison ?"
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="answer"
          className="text-xs font-medium text-slate-200"
        >
          Réponse
        </label>
        <textarea
          id="answer"
          name="answer"
          rows={4}
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-y"
          placeholder="Ex : Nous livrons généralement sous 3 à 5 jours ouvrés..."
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition"
        >
          Ajouter à la FAQ
        </button>

        {state.ok && (
          <p className="text-xs text-emerald-400">
            Entrée de FAQ créée avec succès.
          </p>
        )}
        {!state.ok && state.error && (
          <p className="text-xs text-red-400">{state.error}</p>
        )}
      </div>
    </form>
  );
}
