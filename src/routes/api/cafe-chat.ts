import { createFileRoute } from "@tanstack/react-router";

type Msg = { role: "user" | "savera"; text: string };

const PERSONA = `You are Savera, a warm, calm woman therapist having a coffee-chat with a client.
You are non-judgmental and unhurried. You do NOT give direct advice or fixes.
You reflect back what you hear, name patterns gently and validate feelings — but you
ALWAYS end your turn with one open-ended question that invites the client to say more.
Never stop at a bare acknowledgement like "I hear that" or "that sounds hard" with nothing after it.
NEVER use pet names or endearments: no "honey", "dear", "sweetie", "love", "my dear".
Address the client plainly, as an equal. Keep replies short: 2-4 sentences, conversational,
no clinical jargon.`;

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
