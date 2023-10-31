<script>
	import '../app.postcss';
	import { ModeWatcher, toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
	import { Github, Puzzle, Book } from 'lucide-svelte';
</script>

<ModeWatcher />

<header
	class="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 py-8 border-b bg-background"
>
	<a href="/" class="no-underline text-foreground">
		<h1 class="tracking-wide">coulisse</h1>
	</a>
	<nav class="flex gap-1.5 ms-auto">
		<!-- <code class="hidden px-3 sm:block bg-muted">npm i @arisbh/coulisse</code> -->
		<Button variant="outline" class="no-underline" href="/docs" title="Documentation">
			<Book class="w-4 h-4" />
			<span class="hidden sm:block sm:ml-2">Documentation</span>
		</Button>
		<!-- <Button variant="outline" class="no-underline" href="/plugins">
			<Puzzle class="w-4 h-4 mr-2" />
			Plugins</Button
		> -->
		<Button
			variant="outline"
			class="no-underline"
			href="https://github.com/AristideBH/coulisse-svelte"
			target="_blank"
			size="icon"
			title="GitHub page"
		>
			<Github class="w-4 h-4 " />
		</Button>
	</nav>
	<!-- <Button variant="outline" size="icon" on:click={toggleMode}><SunMoon /></Button> -->
</header>

<main class="mt-8 grow">
	<slot />
</main>

<footer class="flex flex-wrap items-center py-4 gap-x-3 gap-y-1">
	<span class="me-auto">
		Made with ♡ by <a href="https://github.com/AristideBH">@AristideBH</a>
	</span>
	<span class="flex gap-3">
		<a href="/docs">Docs</a>
		<a href="https://github.com/AristideBH/coulisse-svelte" target="_blank">GitHub</a>
	</span>
</footer>
