/**
 * PM2 process definition for magic-lord.baconana.com.
 *
 * Usage:
 *   npm run build
 *   pm2 start ecosystem.config.cjs
 *   pm2 save
 *
 * Settings here must stay in sync with ./Caddyfile:
 *   - PORT must match the `reverse_proxy` target
 *   - HOST=127.0.0.1 keeps Node reachable only through Caddy
 *   - ORIGIN is the public HTTPS origin
 */
module.exports = {
	apps: [
		{
			name: 'magic-lord',
			script: 'build/index.js',
			cwd: __dirname,
			instances: 1,
			exec_mode: 'fork',
			autorestart: true,
			max_memory_restart: '200M',
			time: true,
			env: {
				NODE_ENV: 'production',
				PORT: 3000,
				HOST: '127.0.0.1',
				ORIGIN: 'https://magic-lord.baconana.com'
			}
		}
	]
};
