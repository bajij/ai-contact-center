"use client";

import { FormEvent, useState } from "react";

type ChatMessage = {
  // frIdentifiantMessage
  // enMessageIdentifier
  id: string;
  role: "user" | "assistant";
  content: string;
};

type AssistantTestPanelProps = {
  // frIdentifiantAssistantLie
  // enLinkedAssistantIdentifier
  assistantId: string;
};

// frPanelTestAssistantIAInterne
// enInternalAssistantTestPanel
export function AssistantTestPanel({ assistantId }: AssistantTestPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // frEnvoyerQuestionEtRecupererReponse
  // enSendQuestionAndGetAnswer
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const question = input.trim();
    if (!question || isLoading) return;

    setInput("");
    setErrorMessage(null);

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const payloadMessages = [
        ...messages.map((m) => ({ role: m.role, content: m.content })),
        { role: "user", content: question },
      ];

            const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // frIdentifiantAssistantEtMessage
          // enAssistantIdentifierAndMessage
          assistantId,
          message: question,
          source: "dashboard-test",
        }),
      });


      if (!response.ok) {
        throw new Error("Erreur réseau");
      }

      const data = (await response.json()) as { answer: string };

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.answer,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      const fallback =
        "Une erreur est survenue lors de la récupération de la réponse.";
      setErrorMessage(fallback);

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: fallback,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col gap-4">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold">
          Tester l&apos;assistant IA (interne)
        </h2>
        <p className="text-xs text-slate-400">
          Posez une question comme le ferait un client. L&apos;assistant
          répond uniquement à partir de la FAQ configurée pour cet assistant.
        </p>
      </div>

      {/* frZoneConversation */}
      {/* enConversationArea */}
      <div className="flex-1 rounded-xl border border-slate-800 bg-slate-950/80 p-4 flex flex-col gap-3 overflow-y-auto max-h-80 text-sm">
        {messages.length === 0 ? (
          <p className="text-xs text-slate-500">
            Aucune conversation pour le moment. Posez une première question
            pour démarrer.
          </p>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={
                "max-w-[80%] rounded-2xl px-3 py-2 " +
                (message.role === "user"
                  ? "ml-auto bg-emerald-500 text-slate-950"
                  : "mr-auto bg-slate-800 text-slate-50")
              }
            >
              <p className="text-xs font-semibold mb-0.5">
                {message.role === "user" ? "Vous" : "Assistant"}
              </p>
              <p className="text-xs leading-relaxed">{message.content}</p>
            </div>
          ))
        )}
      </div>

      {/* frFormulaireSaisieQuestion */}
      {/* enQuestionInputForm */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Ex : Quels sont vos délais de livraison ?"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? "Envoi..." : "Envoyer"}
        </button>
      </form>

      {errorMessage && (
        <p className="text-[11px] text-red-400">{errorMessage}</p>
      )}
    </section>
  );
}
