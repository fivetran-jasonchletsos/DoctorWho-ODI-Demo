# Whoniverse Archivist — Cloudflare Worker

Tiny proxy that holds the Anthropic API key and grounds Claude Haiku 4.5
on the archive's indexed data. The `/ask` page on the front-end POSTs
to this worker.

## One-time deploy

```bash
cd whoniverse-app
npm i -g wrangler                                   # if you don't have it
npx tsx scripts/gen-context.mjs                     # refresh whoniverse-context.json
cd worker
wrangler login                                      # opens browser
wrangler secret put ANTHROPIC_API_KEY               # paste your key
wrangler deploy
```

Wrangler prints a URL like `https://whoniverse-archivist.<subdomain>.workers.dev`.

Copy that URL into `.github/workflows/deploy.yml` as the
`NEXT_PUBLIC_ASK_ENDPOINT` env var (or as a repo secret), then push —
the next deploy bakes it into the static site.

## Refreshing the corpus

Whenever you edit `src/lib/{doctors,companions,monsters,episodes}.ts`:

```bash
cd whoniverse-app
npx tsx scripts/gen-context.mjs
cd worker && wrangler deploy
```

## API

`POST /` — body:
```json
{
  "question": "Which Doctor faced the Master the most times?",
  "history": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ]
}
```

Response: streamed `text/plain` — each chunk is a Claude content delta.
The front-end concatenates as they arrive.

## Persona

`whoniverse-archivist`: warm, knowledgeable, UK spellings, treats the
user as a fellow fan. Refuses to invent canon, points back at archive
pages when the answer's longer than 6 sentences.
