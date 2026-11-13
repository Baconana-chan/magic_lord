# Magic Lord

A tiny placeholder page: one picture of a wizard lord, plus a caption that
changes once a day. It exists so visitors redirected here while other sites are
down get something better than an empty page.

- **Stack:** SvelteKit (Svelte 5, TypeScript), no CSS framework
- **Hosting:** Node server (`@sveltejs/adapter-node`) behind Caddy at
  [magic_lord.baconana.com](https://magic_lord.baconana.com)
- **No database, no API, no tracking** — the caption is computed from the date

## How the daily caption works

Captions live in `src/lib/captions.ts` as a list of `{ top, bottom }` pairs.
`src/routes/+page.ts` picks one by the current day number in **UTC**, so every
visitor sees the same caption for the whole day, and a new one tomorrow
(`captions[day % captions.length]`).

To add or change captions, edit that array — no other changes needed. Keep the
list non-empty; the rotation is a simple modulo over its length.

## Development

```sh
npm install
npm run dev          # http://localhost:5173
npm run check        # svelte-check (types + a11y)
npm run build        # production build into ./build
```

There is no lint or test suite; `npm run check` and `npm run build` are the
checks that matter.

## Deploy

The build output is a Node server (`build/index.js`), not static files.

```sh
git clone <this repo> /srv/magic_lord && cd /srv/magic_lord
npm ci
npm run build
PORT=3000 HOST=127.0.0.1 ORIGIN=https://magic_lord.baconana.com node build
```

Environment variables:

| Variable | Default  | Notes                                                       |
| -------- | -------- | ----------------------------------------------------------- |
| `PORT`   | `3000`   | Must match the port in `Caddyfile`                          |
| `HOST`   | `0.0.0.0`| Set to `127.0.0.1` so Node is only reachable through Caddy  |
| `ORIGIN` | —        | Public origin, e.g. `https://magic_lord.baconana.com`       |

Example systemd unit — `/etc/systemd/system/magic-lord.service`:

```ini
[Unit]
Description=Magic Lord placeholder site
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/srv/magic_lord
Environment=NODE_ENV=production
Environment=PORT=3000
Environment=HOST=127.0.0.1
Environment=ORIGIN=https://magic_lord.baconana.com
ExecStart=/usr/bin/node build
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```

```sh
sudo systemctl daemon-reload
sudo systemctl enable --now magic-lord
```

Caddy: include the `Caddyfile` from this repo in `/etc/caddy/Caddyfile` (or copy
the host block), then reload:

```sh
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

Caddy obtains and renews the TLS certificate automatically, so the domain's DNS
`A`/`AAAA` record must point at the server and ports 80/443 must be open.

## Content notes

- The image is `src/lib/assets/lord.jpg`; uncropped, it scales to fit the
  viewport height on small screens.
- The page is marked `noindex` — it is a placeholder, not content you want in
  search results.
- The layout is intentionally a single route: nothing to navigate, nothing to
  break.
