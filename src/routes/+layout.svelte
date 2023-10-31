<script>
	import '../app.postcss';
	import { ModeWatcher, toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
	import { SunMoon } from 'lucide-svelte';
</script>

<ModeWatcher />

<header
	class="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 py-8 mb-8 border-b bg-background"
>
	<a href="/" class="no-underline text-foreground">
		<h1 class="tracking-wide">coulisse</h1>
	</a>
	<nav class="flex gap-3 ms-auto">
		<code class="hidden px-3 sm:block bg-muted">npm i @arisbh/coulisse</code>
		<a href="/docs">Docs</a>
		<a href="https://github.com/AristideBH/coulisse-svelte" target="_blank">GitHub</a>
	</nav>
	<Button variant="outline" size="icon" on:click={toggleMode}><SunMoon /></Button>
</header>

<slot />

<footer class="flex flex-wrap items-center py-4 gap-x-3 gap-y-1">
	<span class="me-auto">
		Made with ♡ by <a href="https://github.com/AristideBH">@AristideBH</a>
	</span>
	<span class="flex gap-3">
		<a href="/docs">Docs</a>
		<a href="https://github.com/AristideBH/coulisse-svelte" target="_blank">GitHub</a>
	</span>
</footer>
