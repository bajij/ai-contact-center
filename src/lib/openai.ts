// frClientOpenAiCentralisePourApplication
// enCentralizedOpenAiClientForApplication

import OpenAI from "openai";

// frVerificationPresenceCleApiOpenAi
// enCheckOpenAiApiKeyPresence
if (!process.env.OPENAI_API_KEY) {
  throw new Error(
    "Variable OPENAI_API_KEY manquante. / OPENAI_API_KEY environment variable is missing.",
  );
}

// frInstanceUniqueClientOpenAi
// enSingleOpenAiClientInstance
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
