// frActionsServeurFaq
// enServerActionsForFaq

"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { getAssistantByIdOrDefault } from "@/lib/assistant";

// frEtatRetourCreationFaq
// enCreateFaqStateType
export type CreateFaqState = {
  ok: boolean;
  error?: string;
};

// frRecupererAssistantIdDepuisFormulaire
// enGetAssistantIdFromFormData
function getAssistantIdFromForm(formData: FormData): string | undefined {
  const value = formData.get("assistantId");
  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }
  return undefined;
}

// frCreationEntreeFaqPourAssistant
// enCreateFaqEntryForAssistant
export async function createFaqItem(
  _prevState: CreateFaqState,
  formData: FormData,
): Promise<CreateFaqState> {
  const assistantId = getAssistantIdFromForm(formData);
  const assistant = await getAssistantByIdOrDefault(assistantId);

  const question = formData.get("question");
  const answer = formData.get("answer");

  if (
    typeof question !== "string" ||
    typeof answer !== "string" ||
    !question.trim() ||
    !answer.trim()
  ) {
    return {
      ok: false,
      error: "La question et la réponse sont obligatoires.",
    };
  }

  await prisma.faqItem.create({
    data: {
      assistantId: assistant.id,
      question: question.trim(),
      answer: answer.trim(),
    },
  });

  revalidatePath("/dashboard/faq");

  return { ok: true };
}

// frSuppressionEntreeFaq
// enDeleteFaqEntry
export async function deleteFaqItem(formData: FormData): Promise<void> {
  const id = formData.get("id");

  if (typeof id !== "string" || !id.trim()) {
    console.error("[deleteFaqItem] ID manquant.");
    return;
  }

  await prisma.faqItem.delete({
    where: { id: id.trim() },
  });

  revalidatePath("/dashboard/faq");
}
