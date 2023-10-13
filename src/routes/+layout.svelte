<script>
	import { autoModeWatcher } from '$lib/theme';
	import '../app.postcss';
</script>

<svelte:head>
	{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}
	<title>Coulisse - Scroll synchronization utility for Svelte</title>
</svelte:head>

<header class="sticky top-0 flex gap-3 flex-wrap justify-between items-baseline py-8">
	<a href="/" class="text-foreground"><h1 class="tracking-wide">coulisse</h1></a>
	<nav class="ms-auto flex gap-3">
		<code class="px-3 hidden sm:block">npm i @arisbh/coulisse</code>
		<a href="/docs">Docs</a>
		<a href="https://github.com/AristideBH/coulisse-svelte" target="_blank">GitHub</a>
	</nav>
</header>

<slot />

<footer class="flex gap-x-3 gap-y-1 flex-wrap items-center py-4">
	<span class="me-auto">
		Made with ♡ by <a href="https://github.com/AristideBH">@AristideBH</a>
	</span>
	<span class="flex gap-3">
		<a href="/docs">Docs</a>
		<a href="https://github.com/AristideBH/coulisse-svelte" target="_blank">GitHub</a>
	</span>
</footer>
