"use server";
// frFichierActionsServeurWidget
// enServerActionsFileForWidget

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

// frEtatRetourMiseAJourWidget
// enUpdateWidgetReturnState
export type UpdateWidgetState = {
  success: boolean;
  message: string;
};

// frServerActionMiseAJourWidget
// enServerActionToUpdateWidget
export async function updateWidgetConfig(
  prevState: UpdateWidgetState,
  formData: FormData,
): Promise<UpdateWidgetState> {
  const assistantId = formData.get("assistantId");
  const buttonText = formData.get("buttonText");
  const primaryColor = formData.get("primaryColor");
  const backgroundColor = formData.get("backgroundColor");

  // ================= VALIDATIONS =================
  // frValidationTypeChamps
  // enBasicFieldTypeValidation
  if (
    typeof assistantId !== "string" ||
    typeof buttonText !== "string" ||
    typeof primaryColor !== "string" ||
    typeof backgroundColor !== "string"
  ) {
    return {
      success: false,
      message: "Données invalides envoyées par le formulaire.",
    };
  }

  const trimmedAssistantId = assistantId.trim();
  const trimmedButtonText = buttonText.trim();
  const trimmedPrimaryColor = primaryColor.trim();
  const trimmedBackgroundColor = backgroundColor.trim();

  if (!trimmedAssistantId) {
    return {
      success: false,
      message: "Assistant introuvable pour ce widget.",
    };
  }

  if (!trimmedButtonText) {
    return {
      success: false,
      message: "Le texte du bouton ne peut pas être vide.",
    };
  }

  // Petite validation très simple sur les couleurs (format #XXXXXX)
  const hexRegex = /^#[0-9a-fA-F]{3,8}$/;
  if (
    !hexRegex.test(trimmedPrimaryColor) ||
    !hexRegex.test(trimmedBackgroundColor)
  ) {
    return {
      success: false,
      message:
        "Les couleurs doivent être au format hexadécimal, par exemple #10B981.",
    };
  }

  try {
    // ================= PERSISTANCE EN BDD =================
    // frUpsertConfigWidgetLieAAssistant
    // enUpsertWidgetConfigLinkedToAssistant
    await prisma.widgetConfig.upsert({
      where: { assistantId: trimmedAssistantId },
      update: {
        buttonText: trimmedButtonText,
        primaryColor: trimmedPrimaryColor,
        backgroundColor: trimmedBackgroundColor,
      },
      create: {
        assistantId: trimmedAssistantId,
        buttonText: trimmedButtonText,
        primaryColor: trimmedPrimaryColor,
        backgroundColor: trimmedBackgroundColor,
      },
    });

    // ================= REVALIDATION =================
    // frOnRevalideLesPagesUtilisantLeWidget
    // enRevalidatePagesUsingTheWidget
    revalidatePath("/dashboard/widget");
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/assistants");

    return {
      success: true,
      message: "Configuration du widget mise à jour avec succès.",
    };
  } catch (error) {
    console.error("updateWidgetConfig error", error);

    return {
      success: false,
      message:
        "Erreur lors de la mise à jour de la configuration du widget.",
    };
  }
}
