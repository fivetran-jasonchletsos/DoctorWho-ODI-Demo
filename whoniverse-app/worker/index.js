// Whoniverse "Ask the Archivist" Cloudflare Worker.
//
// POST  { question: string, history?: {role, content}[] }
// →     streamed text response from Claude Haiku 4.5, grounded in
//       whoniverse-context.json (baked in at deploy time).
//
// Setup:
//   wrangler secret put ANTHROPIC_API_KEY   # paste your key
//   wrangler deploy
//
// Front-end: set NEXT_PUBLIC_ASK_ENDPOINT to the worker URL.

import context from "./whoniverse-context.json";

// CORS origins allowed to call this worker. Lock down to the GH Pages
// host once it's live; "*" is fine for a personal family demo.
const ALLOW_ORIGINS = new Set([
  "https://fivetran-jasonchletsos.github.io",
  "http://localhost:3000",
]);

const SYSTEM_PROMPT = `You are the Whoniverse Archivist, an in-universe assistant for the TARDIS Index File — a Doctor Who fan archive built by Jason for his father Peter and sister-in-law Sarah.

YOUR PERSONA
- Warm, knowledgeable, a little wry. Like a fellow fan at the pub.
- Treat the user as a Doctor Who fan who already knows the basics.
- Sarah and Peter are the primary readers. Peter remembers Hartnell and Troughton; Sarah grew up on the modern era.
- Use UK spelling ("colour", "favourite") and proper Who terminology ("regeneration", "companion", "fam", "TARDIS").
- Keep answers tight — 3-6 sentences for a normal question, a paragraph for something deep.

GROUNDING DATA
You have a JSON corpus of the archive's indexed entities below. When the answer is in there, cite the specific Doctor, story, year, or monster. When it isn't, you can use your own Doctor Who knowledge — but say "the archive doesn't index that" if you're filling gaps.

NEVER
- Invent episodes, regeneration stories, or companion fates.
- Spoil unaired episodes.
- Drop into a customer-service voice. This is a family demo, not a help desk.

ALWAYS
- Tell the user where to look on the site for more: /doctors/, /companions/, /monsters/, /episodes/, /timeline/, /connections/.
- If asked "which Doctor should I watch first?", recommend Nine (Eccleston, 2005) for the modern entry or Four (Tom Baker, 1974) for the classic entry.

THE ARCHIVE CORPUS (JSON):
${JSON.stringify(context)}
`;

function corsHeaders(req) {
  const origin = req.headers.get("Origin") ?? "";
  const allow = ALLOW_ORIGINS.has(origin) ? origin : [...ALLOW_ORIGINS][0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

export default {
  async fetch(req, env) {
    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(req) });
    }
    if (req.method !== "POST") {
      return new Response("POST only", { status: 405, headers: corsHeaders(req) });
    }
    if (!env.ANTHROPIC_API_KEY) {
      return new Response(
        JSON.stringify({ error: "ANTHROPIC_API_KEY not set on the worker." }),
        { status: 500, headers: { "content-type": "application/json", ...corsHeaders(req) } },
      );
    }

    let body;
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "invalid JSON" }), {
        status: 400,
        headers: { "content-type": "application/json", ...corsHeaders(req) },
      });
    }

    const question = (body.question ?? "").toString().slice(0, 2000).trim();
    if (!question) {
      return new Response(JSON.stringify({ error: "empty question" }), {
        status: 400,
        headers: { "content-type": "application/json", ...corsHeaders(req) },
      });
    }

    const history = Array.isArray(body.history)
      ? body.history.slice(-10).map((m) => ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: String(m.content ?? "").slice(0, 4000),
        }))
      : [];

    const messages = [...history, { role: "user", content: question }];

    // Call Anthropic with prompt caching on the system prompt — the
    // corpus is static, so subsequent questions hit a warm cache.
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5",
        max_tokens: 1024,
        stream: true,
        system: [
          {
            type: "text",
            text: SYSTEM_PROMPT,
            cache_control: { type: "ephemeral" },
          },
        ],
        messages,
      }),
    });

    if (!upstream.ok || !upstream.body) {
      const errText = await upstream.text().catch(() => "");
      return new Response(
        JSON.stringify({ error: "upstream error", status: upstream.status, detail: errText.slice(0, 500) }),
        { status: 502, headers: { "content-type": "application/json", ...corsHeaders(req) } },
      );
    }

    // Re-stream as plain text (newline-delimited content deltas) so the
    // browser can render token-by-token without parsing SSE itself.
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();
    let buffer = "";

    (async () => {
      const reader = upstream.body.getReader();
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const payload = line.slice(6).trim();
            if (!payload || payload === "[DONE]") continue;
            try {
              const event = JSON.parse(payload);
              if (event.type === "content_block_delta" && event.delta?.type === "text_delta") {
                await writer.write(encoder.encode(event.delta.text));
              }
            } catch {
              // ignore non-JSON keepalive lines
            }
          }
        }
      } finally {
        await writer.close().catch(() => {});
      }
    })();

    return new Response(readable, {
      status: 200,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "no-store",
        ...corsHeaders(req),
      },
    });
  },
};
