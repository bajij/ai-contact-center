"use server"; 
// frFichierActionsServeurAssistantIa
// enServerActionsFileForIaAssistant

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

// frEtatRetourMiseAJourAssistant
// enUpdateAssistantReturnState
export type UpdateAssistantState = {
  success: boolean;
  message: string;
};

// frServerActionMiseAJourAssistantParId
// enServerActionToUpdateAssistantById
export async function updateAssistantSettings(
  prevState: UpdateAssistantState,
  formData: FormData,
): Promise<UpdateAssistantState> {
  const assistantId = formData.get("assistantId");
  const name = formData.get("name");
  const description = formData.get("description");
  const language = formData.get("language");
  const tone = formData.get("tone");
  const instructions = formData.get("instructions");

  // frValidationTypeChampsFormulaire
  // enBasicFormFieldTypeValidation
  if (
    typeof assistantId !== "string" ||
    typeof name !== "string" ||
    typeof language !== "string" ||
    typeof tone !== "string" ||
    (description !== null && typeof description !== "string") ||
    (instructions !== null && typeof instructions !== "string")
  ) {
    return {
      success: false,
      message: "Données invalides envoyées par le formulaire.",
    };
  }

  const trimmedAssistantId = assistantId.trim();
  const trimmedName = name.trim();
  const trimmedDescription =
    typeof description === "string" ? description.trim() : "";
  const trimmedInstructions =
    typeof instructions === "string" ? instructions.trim() : "";

  if (!trimmedAssistantId) {
    return {
      success: false,
      message: "Assistant introuvable.",
    };
  }

  if (trimmedName.length < 2) {
    return {
      success: false,
      message:
        "Le nom de l'assistant doit contenir au moins 2 caractères.",
    };
  }

  // frNormalisationLangue
  // enLanguageNormalization
  const lang = language.trim().toLowerCase();
  const finalLanguage = lang === "en" ? "en" : "fr";

  // frOnGardeLeTonTelQuel
  // enKeepToneAsIs
  const finalTone = tone.trim() || "neutre";

  try {
    await prisma.assistant.update({
      where: { id: trimmedAssistantId },
      data: {
        name: trimmedName,
        description: trimmedDescription || null,
        language: finalLanguage,
        tone: finalTone,
        instructions: trimmedInstructions || null,
      },
    });

    // frRevalidationPagesUtilisantAssistant
    // enRevalidatePagesUsingAssistant
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/assistant");
    revalidatePath("/dashboard/faq");
    revalidatePath("/dashboard/widget");

    return {
      success: true,
      message: "Configuration de l'assistant mise à jour avec succès.",
    };
  } catch (error) {
    console.error("updateAssistantSettings error", error);

    return {
      success: false,
      message:
        "Erreur lors de la mise à jour de la configuration de l'assistant.",
    };
  }
}
