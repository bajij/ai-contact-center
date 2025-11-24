// frRouteScriptWidgetChatEmbarquable
// enRouteForEmbeddableChatWidgetScript

import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {
  // frScriptWidgetEnIIFEPourInjectionDansSitesExternes
  // enWidgetScriptAsIIFEToInjectIntoExternalSites
  const js = `
(function () {
  var scriptEl = document.currentScript;
  if (!scriptEl) {
    console.error("[AI Contact Center widget] currentScript not found.");
    return;
  }

  var assistantId = scriptEl.getAttribute("data-assistant-id") || "";
  var baseUrl;
  try {
    baseUrl = new URL(scriptEl.src).origin;
  } catch (e) {
    baseUrl = "";
  }

  function createStyles() {
    if (document.getElementById("ai-cc-widget-styles")) return;
    var style = document.createElement("style");
    style.id = "ai-cc-widget-styles";
    style.innerHTML =
      ".ai-cc-widget-container{position:fixed;bottom:16px;right:16px;font-family:system-ui,-apple-system,Segoe UI,sans-serif;z-index:2147483647;}" +
      ".ai-cc-widget-button{border:none;border-radius:9999px;padding:10px 14px;font-size:14px;font-weight:500;cursor:pointer;display:flex;align-items:center;gap:6px;color:#020617;background:#22c55e;box-shadow:0 10px 20px rgba(15,23,42,0.35);}" +
      ".ai-cc-widget-panel{position:fixed;bottom:68px;right:16px;width:320px;max-height:420px;background:#020617;border-radius:16px;box-shadow:0 18px 40px rgba(15,23,42,0.6);display:flex;flex-direction:column;overflow:hidden;border:1px solid rgba(148,163,184,0.35);}" +
      ".ai-cc-widget-panel-header{padding:10px 12px;border-bottom:1px solid rgba(148,163,184,0.3);display:flex;align-items:center;justify-content:space-between;color:#e5e7eb;background:rgba(15,23,42,0.9);}" +
      ".ai-cc-widget-panel-title{font-size:13px;font-weight:600;}" +
      ".ai-cc-widget-panel-subtitle{font-size:11px;opacity:0.8;}" +
      ".ai-cc-widget-panel-body{flex:1;overflow-y:auto;padding:8px 10px;background:rgba(2,6,23,0.95);}" +
      ".ai-cc-widget-panel-footer{padding:8px 10px;border-top:1px solid rgba(148,163,184,0.3);background:rgba(15,23,42,0.96);display:flex;gap:6px;}" +
      ".ai-cc-widget-input{flex:1;border-radius:9999px;border:1px solid rgba(148,163,184,0.5);padding:6px 10px;font-size:12px;color:#e5e7eb;background:rgba(15,23,42,0.9);outline:none;}" +
      ".ai-cc-widget-input::placeholder{color:#6b7280;}" +
      ".ai-cc-widget-send-btn{border:none;border-radius:9999px;padding:6px 10px;font-size:12px;font-weight:500;color:#020617;cursor:pointer;background:#22c55e;}" +
      ".ai-cc-widget-message{max-width:80%;padding:8px 10px;border-radius:14px;font-size:12px;line-height:1.3;margin-bottom:6px;white-space:pre-wrap;}" +
      ".ai-cc-widget-message-user{margin-left:auto;background:#22c55e;color:#022c22;}" +
      ".ai-cc-widget-message-assistant{margin-right:auto;background:#1f2937;color:#e5e7eb;}" +
      ".ai-cc-widget-message-meta{font-size:10px;color:#9ca3af;margin-bottom:2px;}";
    document.head.appendChild(style);
  }

  function createWidget() {
    if (document.getElementById("ai-cc-widget-container")) return;
      
    var userBubbleColor = "#22c55e";

    var container = document.createElement("div");
    container.id = "ai-cc-widget-container";
    container.className = "ai-cc-widget-container";

    var panel = document.createElement("div");
    panel.className = "ai-cc-widget-panel";
    panel.style.display = "none";

    var header = document.createElement("div");
    header.className = "ai-cc-widget-panel-header";

    var titleWrap = document.createElement("div");
    var title = document.createElement("div");
    title.className = "ai-cc-widget-panel-title";
    title.textContent = "Assistant IA";

    var subtitle = document.createElement("div");
    subtitle.className = "ai-cc-widget-panel-subtitle";
    subtitle.textContent = "Réponses basées sur votre FAQ.";

    titleWrap.appendChild(title);
    titleWrap.appendChild(subtitle);

    var closeBtn = document.createElement("button");
    closeBtn.textContent = "×";
    closeBtn.style.border = "none";
    closeBtn.style.background = "transparent";
    closeBtn.style.color = "#9ca3af";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.fontSize = "18px";
    closeBtn.style.lineHeight = "1";

    header.appendChild(titleWrap);
    header.appendChild(closeBtn);

    var body = document.createElement("div");
    body.className = "ai-cc-widget-panel-body";

    var footer = document.createElement("div");
    footer.className = "ai-cc-widget-panel-footer";

    var input = document.createElement("input");
    input.className = "ai-cc-widget-input";
    input.type = "text";
    input.placeholder = "Posez votre question...";

    var sendBtn = document.createElement("button");
    sendBtn.className = "ai-cc-widget-send-btn";
    sendBtn.textContent = "Envoyer";

    footer.appendChild(input);
    footer.appendChild(sendBtn);

    panel.appendChild(header);
    panel.appendChild(body);
    panel.appendChild(footer);

    var button = document.createElement("button");
    button.className = "ai-cc-widget-button";
    button.textContent = "Besoin d'aide ?";

    container.appendChild(panel);
    container.appendChild(button);
    document.body.appendChild(container);

    var isOpen = false;
    function togglePanel() {
      isOpen = !isOpen;
      panel.style.display = isOpen ? "flex" : "none";
    }

    button.addEventListener("click", togglePanel);
    closeBtn.addEventListener("click", togglePanel);

    function appendMessage(sender, text) {
      var wrapper = document.createElement("div");

      var meta = document.createElement("div");
      meta.className = "ai-cc-widget-message-meta";
      meta.textContent = sender === "user" ? "Vous" : "Assistant";

      var bubble = document.createElement("div");
      bubble.className =
        "ai-cc-widget-message " +
        (sender === "user"
          ? "ai-cc-widget-message-user"
          : "ai-cc-widget-message-assistant");
      bubble.textContent = text;

      // frOnAppliqueLaCouleurAuxBullesUtilisateur
      // enApplyColorToUserBubbles
      if (sender === "user") {
        bubble.style.backgroundColor = userBubbleColor;
        bubble.style.color = "#022c22";
      }

      wrapper.appendChild(meta);
      wrapper.appendChild(bubble);
      body.appendChild(wrapper);
      body.scrollTop = body.scrollHeight;
    }


    function setLoading(loading) {
      sendBtn.disabled = loading;
      input.disabled = loading;
      sendBtn.textContent = loading ? "…" : "Envoyer";
    }

    function sendMessage() {
      var text = input.value.trim();
      if (!text) return;

      appendMessage("user", text);
      input.value = "";
      setLoading(true);

      try {
        var apiUrl = baseUrl + "/api/chat";
        var payload = { message: text };
        if (assistantId) {
          payload.assistantId = assistantId;
        }

        fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        })
          .then(function (res) {
            if (!res.ok) {
              throw new Error("API /api/chat error: status " + res.status);
            }
            return res.json();
          })
          .then(function (data) {
            var answer =
              data && data.answer
                ? data.answer
                : "Je ne peux pas répondre pour le moment.";
            appendMessage("assistant", answer);
          })
          .catch(function (error) {
            console.error("[AI Contact Center widget] Chat error:", error);
            appendMessage(
              "assistant",
              "Une erreur est survenue lors de la récupération de la réponse."
            );
          })
          .finally(function () {
            setLoading(false);
          });
      } catch (e) {
        console.error("[AI Contact Center widget] Unexpected error:", e);
        appendMessage(
          "assistant",
          "Une erreur est survenue lors de la récupération de la réponse."
        );
        setLoading(false);
      }
    }

    sendBtn.addEventListener("click", sendMessage);
    input.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter") {
        ev.preventDefault();
        sendMessage();
      }
    });

    // Chargement de la configuration visuelle depuis /api/widget-config
    if (baseUrl) {
      var configUrl =
        baseUrl +
        "/api/widget-config" +
        (assistantId ? "?assistantId=" + encodeURIComponent(assistantId) : "");

      fetch(configUrl)
        .then(function (res) {
          if (!res.ok) {
            throw new Error("API /api/widget-config error: status " + res.status);
          }
          return res.json();
        })
        .then(function (cfg) {
          if (!cfg) return;

          if (cfg.assistantName) {
            title.textContent = cfg.assistantName;
          }

          if (cfg.buttonText) {
            button.textContent = cfg.buttonText;
          }

          if (cfg.primaryColor) {
            button.style.backgroundColor = cfg.primaryColor;
            sendBtn.style.backgroundColor = cfg.primaryColor;

            // frOnMetAJourLaCouleurDesBullesUtilisateur
            // enUpdateUserBubbleColor
            userBubbleColor = cfg.primaryColor;

            // frOnMetAJourLesBullesDejaAffichees
            // enUpdateAlreadyRenderedUserBubbles
            var userBubbles = body.querySelectorAll(".ai-cc-widget-message-user");
            userBubbles.forEach(function (b) {
              b.style.backgroundColor = userBubbleColor;
              b.style.color = "#022c22";
            });
          }

          if (cfg.backgroundColor) {
            panel.style.backgroundColor = cfg.backgroundColor;
            body.style.backgroundColor = cfg.backgroundColor;
            footer.style.backgroundColor = cfg.backgroundColor;
          }

        })
        .catch(function (err) {
          console.error(
            "[AI Contact Center widget] Failed to load widget config:",
            err
          );
        });
    }
  }

  function init() {
    createStyles();
    createWidget();
  }

  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    init();
  } else {
    window.addEventListener("DOMContentLoaded", init);
  }
})();
`.trim();

  return new NextResponse(js, {
    status: 200,
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
