import { createFileRoute } from "@tanstack/react-router";

type Msg = { role: "user" | "savera"; text: string };

const PERSONA = `You are Savera, a warm, calm therapist having a coffee-chat with a client.
You are non-judgmental and unhurried. You do NOT give direct advice or fixes.
You ask open-ended questions, reflect back what you hear, name patterns gently,
validate feelings, and occasionally offer a grounding invitation.
Keep replies short: 2-4 sentences, conversational, never clinical jargon at the client.`;

const TITLE_PROMPT = `You write short clinical session titles for a therapist's notes.
Given the client's first message, reply with ONLY a 2-5 word third-person title in
therapist charting style, e.g. "Client feeling overwhelmed", "Exploring conflict with father".
No quotes, no punctuation at the end, never echo the client's words verbatim.`;

export const Route = createFileRoute("/api/cafe-chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = process.env["LOVABLE_API_KEY"];
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const body = (await request.json()) as { messages?: Msg[]; mode?: string };
        const mode = body.mode === "title" ? "title" : "reply";
        const history = Array.isArray(body.messages) ? body.messages.slice(-14) : [];

        const messages =
          mode === "title"
            ? [
                { role: "system", content: TITLE_PROMPT },
                { role: "user", content: history.map((m) => m.text).join("\n").slice(0, 800) },
              ]
            : [
                { role: "system", content: PERSONA },
                ...history.map((m) => ({
                  role: m.role === "user" ? "user" : "assistant",
                  content: m.text,
                })),
              ];

        const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            messages,
            max_tokens: mode === "title" ? 24 : 300,
          }),
        });

        if (!res.ok) {
          const detail = await res.text().catch(() => "");
          return new Response(detail || "AI request failed", { status: res.status });
        }

        const data = (await res.json()) as {
          choices?: { message?: { content?: string } }[];
        };
        const text = data.choices?.[0]?.message?.content?.trim() ?? "";
        return Response.json({ text });
      },
    },
  },
});
