// frFonctionsUtilitairesPourAssistantIa
// enUtilityFunctionsForIaAssistant

import { prisma } from "@/lib/prisma";

// frRecupererOuCreerAssistantParDefaut
// enGetOrCreateDefaultAssistant
export async function getOrCreateDefaultAssistant() {
  // frOnPrendLePremierAssistantExisteOuOnLeCree
  // enWeTakeFirstExistingAssistantOrCreateOne
  let assistant = await prisma.assistant.findFirst({
    orderBy: { createdAt: "asc" },
  });

  if (!assistant) {
    assistant = await prisma.assistant.create({
      data: {
        name: "Assistant par défaut",
        description:
          "Assistant IA basé sur la FAQ de votre espace.",
        language: "fr",
        tone: "neutre",
      },
    });
  }

  return assistant;
}

// frRecupererAssistantParIdOuDefaut
// enGetAssistantByIdOrFallbackToDefault
export async function getAssistantByIdOrDefault(id?: string | null) {
  if (id) {
    try {
      const assistant = await prisma.assistant.findUnique({
        where: { id },
      });
      if (assistant) {
        return assistant;
      }
    } catch (error) {
      console.error(
        "[assistant] Impossible de récupérer l'assistant demandé :",
        error,
      );
    }
  }

  return getOrCreateDefaultAssistant();
}

// frListerTousLesAssistants
// enListAllAssistants
export async function listAssistants() {
  const assistants = await prisma.assistant.findMany({
    orderBy: { createdAt: "asc" },
  });

  return assistants;
}
