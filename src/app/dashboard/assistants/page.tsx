// frPageGestionMultiAssistants
// enMultiAssistantsManagementPage

import Link from "next/link";

import {
  getOrCreateDefaultAssistant,
  listAssistants,
} from "@/lib/assistant";
import { createAssistant } from "./actions";

export const dynamic = "force-dynamic";

// frPageListeEtCreationAssistantsIa
// enPageListingAndCreatingIaAssistants
export default async function AssistantsPage() {
  const assistants = await listAssistants();
  const defaultAssistant = await getOrCreateDefaultAssistant();

  return (
    <main className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      <header className="space-y-1">
        <p className="text-xs font-semibold text-emerald-400">
          Espace admin
        </p>
        <h1 className="text-xl font-semibold">Assistants</h1>
        <p className="text-sm text-slate-400">
          Gérez les différents assistants IA (un par site ou cas
          d&apos;usage).
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        {/* frListeAssistants */}
        {/* enAssistantsList */}
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-slate-200">
            Assistants existants
          </h2>

          {assistants.length === 0 ? (
            <p className="text-xs text-slate-500">
              Aucun assistant pour le moment. Utilisez le formulaire
              pour en créer un.
            </p>
          ) : (
            <ul className="space-y-3">
              {assistants.map((assistant) => (
                <li
                  key={assistant.id}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 flex items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      {assistant.name}
                      {assistant.id === defaultAssistant.id && (
                        <span className="ml-2 text-[11px] rounded-full bg-slate-800 px-2 py-0.5 text-slate-400">
                          Assistant par défaut
                        </span>
                      )}
                    </p>
                    {assistant.description && (
                      <p className="text-xs text-slate-400">
                        {assistant.description}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 text-xs">
                    <Link
                      href={`/dashboard?assistantId=${assistant.id}`}
                      className="rounded-lg bg-slate-800 px-3 py-1 hover:bg-slate-700 text-slate-100 text-center"
                    >
                      Ouvrir le tableau de bord
                    </Link>
                    <Link
                      href={`/dashboard/widget?assistantId=${assistant.id}`}
                      className="rounded-lg border border-slate-700 px-3 py-1 hover:border-emerald-500 text-slate-200 text-center"
                    >
                      Widget &amp; intégration
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* frFormulaireCreationAssistant */}
        {/* enAssistantCreationForm */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
          <h2 className="text-sm font-medium text-slate-200">
            Créer un nouvel assistant
          </h2>
          <p className="text-xs text-slate-400">
            Idéal pour un autre site, une autre langue ou un cas
            d&apos;usage différent. Les FAQ et widgets seront séparés.
          </p>

          <form action={createAssistant} className="space-y-3">
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="text-xs font-medium text-slate-200"
              >
                Nom de l&apos;assistant
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                minLength={2}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Ex : Assistant site FR"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="description"
                className="text-xs font-medium text-slate-200"
              >
                Description (optionnel)
              </label>
              <textarea
                id="description"
                name="description"
                rows={2}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-y"
                placeholder="Ex : Assistant pour le support du site FR."
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition"
            >
              Créer l&apos;assistant
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
