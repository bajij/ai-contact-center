// frFichierActionsServeurAssistants
// enServerActionsFileForAssistants

"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { getOrCreateDefaultAssistant } from "@/lib/assistant";

// frActionServeurCreationNouvelAssistantIa
// enServerActionToCreateNewIaAssistant
export async function createAssistant(formData: FormData): Promise<void> {
  const name = formData.get("name");
  const description = formData.get("description");

  if (typeof name !== "string" || name.trim().length < 2) {
    // frOnLogErreurMaisOnNeFaitRienPourEviterCrash
    // enWeLogErrorButReturnToAvoidCrashing
    console.error(
      "[createAssistant] Nom d'assistant invalide (au moins 2 caractères requis).",
    );
    return;
  }

  const trimmedName = name.trim();
  const trimmedDescription =
    typeof description === "string" ? description.trim() : "";

  // frOnCopieLangueTonInstructionDepuisAssistantDefaut
  // enCopyLanguageToneInstructionsFromDefaultAssistant
  const defaultAssistant = await getOrCreateDefaultAssistant();

  await prisma.assistant.create({
    data: {
      name: trimmedName,
      description: trimmedDescription || null,
      language: defaultAssistant.language,
      tone: defaultAssistant.tone,
      instructions: defaultAssistant.instructions,
    },
  });

  // frOnRevalidePageListeAssistants
  // enRevalidateAssistantsListPage
  revalidatePath("/dashboard/assistants");
}
