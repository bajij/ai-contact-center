import Image from "next/image";

// frPageAccueilApplicationAiContactCenter
// enHomePageForAiContactCenterApplication

export default function Home() {
  return (
    // frConteneurPrincipalPleinEcranFondSombre
    // enMainFullScreenContainerWithDarkBackground
    <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center">
      {/* frSectionCarteCentraleAvecContenu */}
      {/* enCenterCardSectionWithContent */}
      <section className="max-w-xl w-full rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow-lg">
        {/* frTitrePrincipalProduit */}
        {/* enMainProductTitle */}
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
          AI Contact Center
        </h1>

        {/* frDescriptionCourteProduit */}
        {/* enShortProductDescription */}
        <p className="text-sm md:text-base text-slate-300 mb-6">
          Automatisez les réponses à vos questions fréquentes grâce à un
          assistant IA connecté à votre propre base de connaissances. Version
          MVP en construction.
        </p>

        {/* frZoneBoutonsActions */}
        {/* enActionButtonsArea */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition"
            type="button"
          >
            {/* frBoutonPrincipalCreationCompte */}
            {/* enPrimaryButtonCreateAccount */}
            Créer mon compte (bientôt)
          </button>

          <button
            className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium border border-slate-600 text-slate-100 hover:bg-slate-800 transition"
            type="button"
          >
            {/* frBoutonSecondaireVoirDemo */}
            {/* enSecondaryButtonViewDemo */}
            Voir la démo (mock)
          </button>
        </div>
      </section>
    </main>
  );
}
