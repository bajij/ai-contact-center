// frRouteApiChatAssistantIa
// enApiRouteChatIaAssistant

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

import { prisma } from "@/lib/prisma";
import { getOrCreateDefaultAssistant } from "@/lib/assistant";

export const runtime = "nodejs"; // frNecessairePourPrisma / enRequiredForPrisma

// frClientOpenAiInitialiseAvecCleEnvironment
// enOpenAiClientInitialisedWithEnvKey
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// frAjoutSystematiqueCors
// enAttachCorsHeadersToResponse
function withCors(res: NextResponse): NextResponse {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return res;
}

// frReponseErreurStandardise
// enStandardErrorResponse
function errorJson(message: string, status: number) {
  return withCors(
    NextResponse.json(
      { error: message },
      { status },
    ),
  );
}

// frGestionRequetePreflightCors
// enHandleCorsPreflightRequest
export function OPTIONS() {
  const res = new NextResponse(null, { status: 204 });
  return withCors(res);
}

// frPointEntreePrincipalChat
// enMainEntryPointForChat
export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      console.error("[/api/chat] Missing OPENAI_API_KEY env var.");
      return errorJson(
        "Le service IA n'est pas correctement configuré côté serveur.",
        500,
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return errorJson("Corps de requête invalide (JSON attendu).", 400);
    }

    // frValidationDonneesEntree
    // enInputDataValidation
    const message =
      typeof (body as any).message === "string"
        ? (body as any).message.trim()
        : "";
    const assistantId =
      typeof (body as any).assistantId === "string"
        ? (body as any).assistantId
        : undefined;

    if (!message) {
      return errorJson("Le champ 'message' est requis.", 400);
    }

    // frRecuperationAssistantCible
    // enRetrieveTargetAssistant
    let assistant =
      assistantId && assistantId.length > 0
        ? await prisma.assistant.findUnique({
            where: { id: assistantId },
          })
        : null;

    if (!assistant) {
      const def = await getOrCreateDefaultAssistant();
      assistant = await prisma.assistant.findUnique({
        where: { id: def.id },
      });
    }

    if (!assistant) {
      console.error("[/api/chat] No assistant found.");
      return errorJson("Aucun assistant disponible.", 500);
    }

    // frRecuperationFaqLieeAAssistant
    // enRetrieveFaqLinkedToAssistant
    const faqItems = await prisma.faqItem.findMany({
      where: { assistantId: assistant.id },
      orderBy: { createdAt: "asc" },
    });

    const faqText =
      faqItems.length > 0
        ? faqItems
            .map(
              (item) =>
                `Q: ${item.question}\nA: ${item.answer}`,
            )
            .join("\n\n")
        : "Aucune entrée de FAQ n'est encore configurée.";

    // frAdaptationLangueEtTon
    // enLanguageAndToneAdaptation
    const lang = assistant.language === "en" ? "en" : "fr";
    const tone = assistant.tone ?? "neutre";

    const toneDescription =
      lang === "fr"
        ? tone === "chaleureux"
          ? "un ton chaleureux, amical et rassurant"
          : tone === "formel"
          ? "un ton formel et professionnel"
          : "un ton neutre et professionnel"
        : tone === "chaleureux"
        ? "a warm, friendly and reassuring tone"
        : tone === "formel"
        ? "a formal, professional tone"
        : "a neutral, professional tone";

    const languageInstruction =
      lang === "fr"
        ? "Réponds uniquement en français."
        : "Answer only in English.";

    const baseInstructions =
      lang === "fr"
        ? `Tu es un assistant de support client pour l'entreprise "${assistant.name}". Tu dois répondre uniquement à partir de la FAQ fournie. Si tu n'es pas sûr, indique que tu ne peux pas répondre avec certitude et invite l'utilisateur à contacter le support humain. Utilise ${toneDescription}. ${languageInstruction}`
        : `You are a customer support assistant for the business "${assistant.name}". You must answer strictly based on the FAQ provided. If you are not sure, say you cannot answer with certainty and invite the user to contact human support. Use ${toneDescription}. ${languageInstruction}`;

    const extraInstructions =
      assistant.instructions && assistant.instructions.trim().length > 0
        ? assistant.instructions.trim()
        : "";

    const systemPrompt =
      baseInstructions +
      (extraInstructions ? "\n\nInstructions supplémentaires :\n" + extraInstructions : "") +
      "\n\nBase de connaissances (FAQ) :\n" +
      faqText;

    // frAppelModeleOpenAi
    // enCallOpenAiModel
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.3,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
    });

    const answer =
      completion.choices[0]?.message?.content?.trim() ??
      (lang === "fr"
        ? "Je ne peux pas répondre pour le moment."
        : "I cannot answer at the moment.");

    const res = NextResponse.json(
      {
        answer,
      },
      { status: 200 },
    );

    return withCors(res);
  } catch (error) {
    console.error("[/api/chat] Unexpected error:", error);
    return errorJson(
      "Une erreur interne est survenue dans le service de chat.",
      500,
    );
  }
}
