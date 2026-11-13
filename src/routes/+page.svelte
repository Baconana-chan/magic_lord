<script lang="ts">
	import lord from '#lib/assets/lord.jpg';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.caption.top} — Magic Lord</title>
	<meta name="description" content={data.caption.bottom} />
	<meta name="robots" content="noindex" />
</svelte:head>

<main>
	<h1>{data.caption.top}</h1>

	<img
		src={lord}
		alt="Wizard lord in a green robe holding a glowing green staff and wearing a paper crown, next to a framed Moon drawing and a CRT monitor that says: I know things only SOME people know about. But I can't tell you."
	/>

	<p>{data.caption.bottom}</p>
</main>

<style>
	:global(html, body) {
		margin: 0;
		min-height: 100%;
	}

	:global(body) {
		background-color: #f6f2e9;
		color: #14110e;
		font-family: ui-monospace, 'Cascadia Mono', 'Segoe UI Mono', Menlo, Consolas, monospace;
	}

	main {
		box-sizing: border-box;
		min-height: 100svh;
		max-width: 900px;
		margin: 0 auto;
		padding: 2.5rem 1.25rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: clamp(1rem, 3vw, 2rem);
		text-align: center;
	}

	h1 {
		margin: 0;
		font-size: clamp(1.25rem, 4.5vw, 2.25rem);
		line-height: 1.15;
		letter-spacing: 0.02em;
		text-transform: uppercase;
		text-wrap: balance;
	}

	img {
		display: block;
		width: auto;
		max-width: 100%;
		max-height: 58svh;
		border: 3px solid #14110e;
		border-radius: 6px;
		box-shadow: 8px 8px 0 #14110e;
	}

	p {
		margin: 0;
		max-width: 40ch;
		font-size: clamp(0.9rem, 2.4vw, 1.05rem);
		line-height: 1.5;
		text-wrap: balance;
	}

	@media (max-width: 420px) {
		img {
			box-shadow: 5px 5px 0 #14110e;
		}
	}
</style>
