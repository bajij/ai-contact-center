// src/app/api/widget-config/route.ts
// frRouteApiConfigWidgetPourSitesExternes
// enApiRouteWidgetConfigForExternalSites

import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getOrCreateDefaultAssistant } from "@/lib/assistant";

// frAjoutSystematiqueDesEntetesCORSALaReponse
// enUtilityToAttachCorsHeadersToResponse
function withCors(response: NextResponse): NextResponse {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}

// frReponseGETRetourneConfigurationWidget
// enGetHandlerReturnsWidgetConfiguration
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const assistantId = url.searchParams.get("assistantId");

    // frOnEssaieDeTrouverAssistantParIdSiFourni
    // enTryToFindAssistantByIdIfProvided
    let assistant =
      assistantId && assistantId.length > 0
        ? await prisma.assistant.findUnique({
            where: { id: assistantId },
            include: { widgetConfig: true },
          })
        : null;

    // frSiPasTrouveOnPrendAssistantParDefaut
    // enIfNotFoundWeTakeDefaultAssistant
    if (!assistant) {
      const def = await getOrCreateDefaultAssistant();
      assistant = await prisma.assistant.findUnique({
        where: { id: def.id },
        include: { widgetConfig: true },
      });
    }

    if (!assistant) {
      const fallback = withCors(
        NextResponse.json({
          assistantId: "",
          assistantName: "Assistant IA",
          buttonText: "Besoin d'aide ?",
          primaryColor: "#10b981",
          backgroundColor: "#020617",
        }),
      );
      return fallback;
    }

    const widgetConfig = assistant.widgetConfig ?? {
      buttonText: "Besoin d'aide ?",
      primaryColor: "#10b981",
      backgroundColor: "#020617",
    };

    const response = NextResponse.json({
      assistantId: assistant.id,
      assistantName: assistant.name,
      buttonText: widgetConfig.buttonText,
      primaryColor: widgetConfig.primaryColor,
      backgroundColor: widgetConfig.backgroundColor ?? "#020617",
    });

    return withCors(response);
  } catch (error) {
    console.error("Erreur API /api/widget-config :", error);

    const errorResponse = NextResponse.json(
      { error: "Erreur interne du serveur pour le widget." },
      { status: 500 },
    );

    return withCors(errorResponse);
  }
}

// frReponsePreflightCORS
// enCorsPreflightResponse
export function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  return withCors(response);
}
