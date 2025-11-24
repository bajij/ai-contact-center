"use client"; // frComposantChatExecuteCoteClient
              // enChatComponentRunningOnClientSide

import { useState } from "react";

// frTypeMessageDiscussionChat
// enChatConversationMessageType
type ChatMessage = {
  id: string;
  sender: "user" | "assistant";
  text: string;
};

function createId() {
  // frGenerateurIdSimplePourMessages
  // enSimpleIdGeneratorForMessages
  return Math.random().toString(36).slice(2);
}

// frComposantPrincipalChatAssistantIa
// enMainIaAssistantChatComponent
export function AssistantChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // frGestionEnvoiFormulaireMessage
  // enHandleFormSubmitForMessage
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = input.trim();
    if (!trimmed) return;

    setError(null);
    setIsSending(true);

    const userMessage: ChatMessage = {
      id: createId(),
      sender: "user",
      text: trimmed,
    };

    // frAjoutMessageUtilisateurLocalement
    // enAddUserMessageLocally
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? "Erreur lors de l'appel à l'API.");
      }

      const data: { answer: string } = await response.json();

      const assistantMessage: ChatMessage = {
        id: createId(),
        sender: "assistant",
        text: data.answer,
      };

      // frAjoutReponseAssistant
      // enAddAssistantResponse
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (e) {
      console.error(e);
      setError(
        "Une erreur est survenue lors de l'appel à l'assistant. / An error occurred while contacting the assistant.",
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col gap-4">
      {/* frEnTeteBlocChat */}
      {/* enChatBlockHeader */}
      <div>
        <h2 className="text-base font-semibold">
          Tester l&apos;assistant IA (interne)
        </h2>
        <p className="text-xs text-slate-400">
          Posez une question comme le ferait un client. L&apos;assistant
          répondra uniquement à partir de la FAQ configurée.
        </p>
      </div>

      {/* frZoneMessagesChat */}
      {/* enChatMessagesArea */}
      <div className="h-80 max-h-96 overflow-y-auto rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-3 space-y-3 text-sm">
        {messages.length === 0 ? (
          <p className="text-xs text-slate-500">
            Aucune conversation pour le moment. Posez une première question
            pour démarrer.
          </p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                  msg.sender === "user"
                    ? "bg-emerald-500 text-slate-950"
                    : "bg-slate-800 text-slate-50"
                }`}
              >
                <p className="text-xs font-semibold mb-1">
                  {msg.sender === "user" ? "Vous" : "Assistant"}
                </p>
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* frMessageErreurEventuelle */}
      {/* enOptionalErrorMessage */}
      {error && <p className="text-xs text-red-400">{error}</p>}

      {/* frFormulaireSaisieMessage */}
      {/* enMessageInputForm */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 sm:flex-row sm:items-center"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ex : Quels sont vos délais de livraison ?"
          className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
        <button
          type="submit"
          disabled={isSending || !input.trim()}
          className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium bg-emerald-500 hover:bg-emerald-400 text-slate-950 disabled:opacity-60 disabled:cursor-not-allowed transition"
        >
          {isSending ? "Envoi..." : "Envoyer"}
        </button>
      </form>
    </div>
  );
}
