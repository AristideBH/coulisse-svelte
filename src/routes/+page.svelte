<script lang="ts">
	import { onMount } from 'svelte';
	import coulisse from '$lib';
	import * as animateScroll from 'svelte-scrollto';
	import { Button } from '$lib/components/ui/button';
	import { ArrowDownWideNarrow } from 'lucide-svelte';

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

<section class="flex flex-col items-start gap-4 mb-16">
	<div class="max-w-2xl lead text-balance">
		<p>
			Coulisse is a simple and efficient Sveltekit library that lets you sync the scroll state of
			multiple elements. With Coulisse, you can create smooth and responsive scrolling effects to
			enhance user experience and showcase your content.
		</p>
	</div>

	<div class="flex flex-col items-start gap-6 gap-y-3">
		<Button
			variant="link"
			class="px-0 text-foreground hover:no-underline"
			on:click={() => animateScroll.scrollTo({ element: '#demo1' })}
		>
			<ArrowDownWideNarrow class="w-4 h-4 mr-2" />
			Scroll for the basic demos
		</Button>
		<Button href="/docs" class="no-underline" variant="outline">Read the documentation</Button>
	</div>
</section>

<section id="demo1" class="z-0 sticky top-[6rem] md:top-[9rem] flex flex-col">
	<p class="desc">This container is synced to the body</p>
	<div class="poulie h-[40vh] lg:h-[50vh]" bind:this={pouliesBody[0]}>
		<div class="grid-bg h-[200vh]" />
	</div>
	<Button
		variant="link"
		class="px-0 mt-2 text-balance text-foreground hover:no-underline"
		on:click={() => animateScroll.scrollToBottom()}
	>
		<ArrowDownWideNarrow class="w-4 h-4 mr-2" />
		Scroll in the container or in the body
	</Button>
	<div class="h-[43vh] w-full bg-red pointer-events-none" />
</section>

<section id="demo2" class="flex-col">
	<p class="desc">These containers are synced on both axis</p>
	<div class="flex max-h-[24vh] gap-3">
		<div class="w-1/2 poulie" bind:this={pouliesScrollables[0]}>
			<div class="h-[150dvh] w-[150vw]" />
		</div>
		<div class="w-1/2 rounded-tl poulie" bind:this={pouliesScrollables[1]}>
			<div class=" grid-large h-[300vh] w-[300vw]" />
		</div>
	</div>
</section>

<section class="flex flex-col items-start gap-2 mt-auto isolate">
	<p class="lead text-balance">Want to install and customize Elaimant ?</p>
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
