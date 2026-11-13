# Magic Lord

A tiny placeholder page: one picture of a wizard lord, plus a caption that
changes once a day. It exists so visitors redirected here while other sites are
down get something better than an empty page.

- **Stack:** SvelteKit (Svelte 5, TypeScript), no CSS framework
- **Hosting:** Node server (`@sveltejs/adapter-node`) behind Caddy at
  [magic-lord.baconana.com](https://magic-lord.baconana.com)
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
git clone <this repo> /srv/magic-lord && cd /srv/magic-lord
npm ci
npm run build
PORT=3000 HOST=127.0.0.1 ORIGIN=https://magic-lord.baconana.com node build
```

Environment variables:

| Variable | Default  | Notes                                                       |
| -------- | -------- | ----------------------------------------------------------- |
| `PORT`   | `3000`   | Must match the port in `Caddyfile`                          |
| `HOST`   | `0.0.0.0`| Set to `127.0.0.1` so Node is only reachable through Caddy  |
| `ORIGIN` | —        | Public origin, e.g. `https://magic-lord.baconana.com`       |

### Run with PM2

The process settings live in `ecosystem.config.cjs`, so nothing needs root: no
unit file, no system paths.

```sh
npm ci
npm run build
pm2 start ecosystem.config.cjs   # first time
pm2 save                          # remember the process list
```

If PM2 is not installed yet: `npm i -g pm2` (or prefix everything with `npx`).

After a deploy — `git pull && npm ci && npm run build` — pick up the new build:

```sh
pm2 restart magic-lord --update-env
```

Useful commands:

```sh
pm2 status
pm2 logs magic-lord
pm2 describe magic-lord
pm2 delete magic-lord   # stop and forget it
```

To bring the site back after a reboot, run `pm2 startup` once (it prints a
command to copy-paste; on some hosts that command asks for elevated rights). If
you would rather avoid that entirely, add this to your own crontab instead
(`crontab -e`):

```cron
@reboot pm2 resurrect
```

Keep `ecosystem.config.cjs` in sync with `Caddyfile`: `PORT` must match the
`reverse_proxy` target, `HOST=127.0.0.1` keeps Node reachable only through
Caddy, and `ORIGIN` must be the public HTTPS origin.

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
