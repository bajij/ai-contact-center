"use client"; // frComposantCoteClientPourGestionEvenements
              // enClientSideComponentForEventHandling

import { deleteFaqItem } from "@/app/dashboard/faq/actions";

interface DeleteFaqButtonProps {
  // frIdentifiantUniqueEntreeFaqASupprimer
  // enUniqueFaqEntryIdToDelete
  id: string;
}

// frBoutonSuppressionFaqAvecConfirmation
// enFaqDeleteButtonWithConfirmation
export function DeleteFaqButton({ id }: DeleteFaqButtonProps) {
  // frInterceptionSubmitPourAfficherConfirmation
  // enInterceptSubmitToShowConfirmation
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const ok = window.confirm(
      "Voulez-vous vraiment supprimer cette entrée de FAQ ? Cette action est définitive.",
    );

    if (!ok) {
      event.preventDefault();
    }
  }

  return (
    <form
      action={deleteFaqItem}
      onSubmit={handleSubmit}
      className="inline-block"
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="inline-flex items-center rounded-md border border-red-500/80 px-2 py-1 text-[11px] font-medium text-red-300 hover:bg-red-500/10 transition"
      >
        Supprimer
      </button>
    </form>
  );
}
