// frPageDashboardFaqMultiAssistant
// enDashboardFaqPageMultiAssistant

import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { getAssistantByIdOrDefault } from "@/lib/assistant";
import { FaqForm } from "@/components/faq/faq-form";
import { deleteFaqItem } from "./actions";

type PageProps = {
  // frLesParametresDeRechercheSontDesPromesses
  // enSearchParamsAreProvidedAsPromises
  searchParams: Promise<{
    assistantId?: string;
  }>;
};

// frPageDashboardFaqMultisiteMultassistant
// enDashboardFaqPageMultisiteMultassistant
export default async function DashboardFaqPage({ searchParams }: PageProps) {
  const { assistantId } = await searchParams;

  const assistant = await getAssistantByIdOrDefault(assistantId);

  const faqItems = await prisma.faqItem.findMany({
    where: { assistantId: assistant.id },
    orderBy: { createdAt: "desc" },
  });

  const hasItems = faqItems.length > 0;

  return (
    <main className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      <header className="space-y-1">
        <p className="text-xs font-semibold text-emerald-400">
          Espace admin
        </p>
        <h1 className="text-xl font-semibold">FAQ</h1>
        <p className="text-sm text-slate-400">
          Gérez ici les questions/réponses qui serviront de base de
          connaissances à votre assistant IA.
        </p>
      </header>

      {/* frInfoAssistantCourant */}
      {/* enCurrentAssistantInfo */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-1">
        <p className="text-xs text-slate-300">
          Assistant courant :{" "}
          <span className="font-semibold">{assistant.name}</span>
        </p>
        <p className="text-[11px] text-slate-500">
          Toutes les entrées de la FAQ ci-dessous sont liées à cet
          assistant.
        </p>
      </section>

      {/* frFormulaireCreationFaq */}
      {/* enFaqCreationForm */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
        <div className="space-y-1">
          <h2 className="text-sm font-semibold">
            Ajouter une entrée à la FAQ
          </h2>
          <p className="text-xs text-slate-400">
            Saisissez une question et une réponse claire que votre
            assistant IA pourra réutiliser.
          </p>
        </div>

        <FaqForm assistantId={assistant.id} />
      </section>

      {/* frTableauFaq */}
      {/* enFaqTable */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold">Entrées de la FAQ</h2>
          <p className="text-xs text-slate-400">
            {hasItems
              ? `${faqItems.length} entrée(s).`
              : "Aucune entrée pour le moment."}
          </p>
        </div>

        {hasItems ? (
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-900/80">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-slate-300">
                    Question
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-slate-300">
                    Réponse
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-slate-300 w-32">
                    Créée le
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-slate-300 w-24">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {faqItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-slate-800 hover:bg-slate-900/60"
                  >
                    <td className="align-top px-4 py-3 text-slate-100">
                      {item.question}
                    </td>
                    <td className="align-top px-4 py-3 text-slate-300">
                      {item.answer}
                    </td>
                    <td className="align-top px-4 py-3 text-xs text-slate-400">
                      {item.createdAt.toLocaleDateString("fr-FR")}
                    </td>
                    <td className="align-top px-4 py-3 text-xs">
                      <div className="flex flex-col gap-1">
                        <Link
                          href={`/dashboard/faq/${item.id}/edit`}
                          className="text-emerald-400 hover:text-emerald-300"
                        >
                          Modifier
                        </Link>

                          <form
                            action={deleteFaqItem}
                            className="inline-block"
                          >
                            <input
                              type="hidden"
                              name="id"
                              value={item.id}
                            />
                            <button
                              type="submit"
                              className="text-red-400 hover:text-red-300"
                            >
                              Supprimer
                            </button>
                          </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-slate-400">
            Ajoutez vos premières questions/réponses pour alimenter la
            FAQ de cet assistant.
          </p>
        )}
      </section>
    </main>
  );
}
