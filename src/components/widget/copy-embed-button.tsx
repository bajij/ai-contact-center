"use client"; // frComposantClientGestionCopiePressePapiers
              // enClientComponentHandlingClipboardCopy

import { useState } from "react";

interface CopyEmbedButtonProps {
  // frCodeIntegrationAInsererDansLeSiteExterne
  // enIntegrationCodeToInsertIntoExternalSite
  embedCode: string;
}

// frBoutonCopieCodeIntegrationWidget
// enWidgetEmbedCodeCopyButton
export function CopyEmbedButton({ embedCode }: CopyEmbedButtonProps) {
  const [copied, setCopied] = useState(false);

  // frGestionClickCopierDansPressePapiers
  // enHandleClickCopyToClipboard
  async function handleCopy() {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(embedCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error("Erreur lors de la copie du code d'intégration :", error);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="absolute right-2 top-2 rounded-md border border-slate-600 bg-slate-900/80 px-2 py-1 text-[10px] font-medium text-slate-100 hover:bg-slate-800 transition"
    >
      {copied ? "Copié" : "Copier"}
    </button>
  );
}
