<script lang="ts">
	import { onMount } from 'svelte';
	import coulisse from '$lib';
	import * as animateScroll from 'svelte-scrollto';
	import { Button } from '$lib/components/ui/button';

	let pouliesBody: HTMLElement[] = [];

	onMount(() => {
		coulisse(pouliesBody, { decimal: 1 });
	});

	let pouliesScrollables: HTMLElement[] = [];
	onMount(() => coulisse(pouliesScrollables, { decimal: 1 }));
</script>

<svelte:head>
	<title>Coulisse for svelte</title>
	<meta name="description" content="A simple sync-scrolling utility for Sveltekit" />
</svelte:head>

<section class="z-50 flex flex-col items-start gap-4 mt-16 mb-16">
	<p class="max-w-2xl lead">
		Coulisse is a simple yet efficient Sveltekit library that lets you sync the scroll state of
		multiple elements. With Coulisse, you can create smooth and responsive scrolling effects that
		enhance the user experience and showcase your content.
	</p>
	<button class="z-10 small" on:click={() => animateScroll.scrollTo({ element: '#demo1' })}>
		Scroll the page for the basic demos
	</button>
	<div class="z-10 flex gap-2 mt-4">
		<Button href="/docs" class="no-underline" variant="outline">Read the documentation</Button>
	</div>
</section>

<section id="demo1" class="sticky top-[9rem] h-[42vh] flex flex-col z-10">
	<p class="desc">This container is synced to the body.</p>
	<div class="h-full poulie" bind:this={pouliesBody[0]}>
		<div class="grid-bg h-[150vh]" />
	</div>
	<button class="z-20 mx-auto mt-4 small" on:click={() => animateScroll.scrollToBottom()}>
		Scroll either in the container or in the body to see more...
	</button>
</section>

<section id="demo2" class="flex flex-col pt-[150vh] sticky bottom-0">
	<p class="desc">These two containers are in sync on both axis.</p>
	<div class="flex max-h-[24vh] gap-3">
		<div class="w-1/2 poulie" bind:this={pouliesScrollables[0]}>
			<div class="h-[150vh] w-[150vw]" />
		</div>
		<div class="w-1/2 rounded-tl poulie" bind:this={pouliesScrollables[1]}>
			<div class=" grid-large h-[300vh] w-[300vw]" />
		</div>
	</div>
</section>

<section class="z-10 flex flex-col items-start gap-2">
	<p class="lead">Consult the documentation to install and options</p>
	<Button href="/docs" class="no-underline" variant="outline">Read the documentation</Button>
</section>

<style lang="postcss">
	.poulie {
		@apply overflow-auto rounded-b rounded-tr border;
	}

	.poulie > div {
		opacity: 0.3;
		background-image: linear-gradient(hsl(var(--muted-foreground)) 2px, transparent 2px),
			linear-gradient(90deg, hsl(var(--muted-foreground)) 2px, transparent 2px),
			linear-gradient(hsl(var(--muted-foreground)) 1px, transparent 1px),
			linear-gradient(90deg, hsl(var(--muted-foreground)) 1px, hsl(var(--background)) 1px);
		background-size:
			50px 50px,
			50px 50px,
			10px 10px,
			10px 10px;
		background-position:
			-2px -2px,
			-2px -2px,
			-1px -1px,
			-1px -1px;
	}

	.poulie > div.grid-large {
		background-size:
			75px 75px,
			75px 75px,
			15px 15px,
			15px 15px;
		background-position:
			-3px -3px,
			-3px -3px,
			-1.5px -1.5px,
			-1.5px -1.5px;
	}
</style>
