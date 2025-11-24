// frPageEditionEntreeFaq
// enFaqEntryEditPage

import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { updateFaqItem } from "../../actions";

interface EditFaqPageProps {
  // frParamsFourniParNextSousFormeDePromise
  // enParamsProvidedByNextAsAPromise
  params: Promise<{ id: string }>;
}

export default async function EditFaqPage({ params }: EditFaqPageProps) {
  // frOnRecupereIdDepuisLesParamsAsynchrones
  // enWeRetrieveIdFromAsyncParams
  const { id } = await params;

  const faqItem = await prisma.faqItem.findUnique({
    where: { id },
  });

  if (!faqItem) {
    // frSiLEntreeNExistePasOnRenvoie404
    // enIfEntryDoesNotExistReturn404
    notFound();
  }

  return (
    <div className="space-y-4">
      {/* frEnTetePageEdition */}
      {/* enEditPageHeader */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Modifier une entrée de FAQ
          </h1>
          <p className="text-sm text-slate-300">
            Mettez à jour la question et la réponse. Les changements seront
            pris en compte immédiatement par l&apos;assistant IA.
          </p>
        </div>

        <Link
          href="/dashboard/faq"
          className="text-sm text-emerald-400 hover:underline"
        >
          ← Retour à la liste des FAQ
        </Link>
      </div>

      {/* frCarteFormulaireEdition */}
      {/* enEditFormCard */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
        <form action={updateFaqItem} className="space-y-4">
          {/* frIdCacheDeLEntreeFaq */}
          {/* enHiddenFaqEntryId */}
          <input type="hidden" name="id" value={faqItem.id} />

          {/* frChampQuestion */}
          {/* enQuestionField */}
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
              minLength={5}
              defaultValue={faqItem.question}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* frChampReponse */}
          {/* enAnswerField */}
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
              required
              minLength={5}
              rows={6}
              defaultValue={faqItem.answer}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-y"
            />
          </div>

          {/* frZoneBoutonsActions */}
          {/* enActionsButtonsArea */}
          <div className="flex items-center justify-between gap-3">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition"
            >
              Enregistrer les modifications
            </button>

            <Link
              href="/dashboard/faq"
              className="text-xs text-slate-400 hover:text-slate-200"
            >
              Annuler et retourner à la liste
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
