<script lang="ts">
	import { onMount } from 'svelte';
	import coulisse from '$lib';

	import { Button } from '$lib/components/ui/button';

	let pouliesBody: HTMLElement[] = [];

	onMount(() => {
		coulisse(pouliesBody, { decimal: 1 });
		// console.log(pouliesBody[0].getBoundingClientRect().y);
	});

	let pouliesScrollables: HTMLElement[] = [];
	onMount(() => coulisse(pouliesScrollables, { decimal: 1 }));
</script>

<svelte:head>
	<title>Coulisse for svelte</title>
	<meta name="description" content="A simple sync-scrolling utility for Sveltekit" />
</svelte:head>

<section class="flex flex-col items-start gap-4 mt-8 mb-16">
	<p class="max-w-2xl lead">
		Coulisse lets you sync the scroll state of multiple elements on your web page. With Coulisse,
		you can create smooth and responsive scrolling effects that enhance the user experience and
		showcase your content.
	</p>
	<p class="small">Scroll the page for the basic demos</p>
	<div class="flex gap-2 mt-4">
		<Button href="/docs" class="no-underline">Read the documentation</Button>
		<Button href="/plugins" class="no-underline" variant="outline">Check the plugins</Button>
	</div>
</section>
<div class="h-[150vh] flex flex-col justify-between gap-5" id="demo">
	<section class="sticky top-[10vh] h-[40vh] flex flex-col gap-1 pt-5">
		<p>This container is synced to the body.</p>
		<div class="h-full poulie" bind:this={pouliesBody[0]}>
			<div class="grid-bg h-[150vh]" />
		</div>
		<p class="mx-auto mt-2 small">Scroll either in the container or in the body</p>
	</section>
	<section class="flex flex-col gap-1 mt-5">
		<p class="mt-auto">These two containers are in sync on both axis.</p>
		<div class="flex h-[34vh] gap-3">
			<div class="w-1/2 poulie" bind:this={pouliesScrollables[0]}>
				<div class=" h-[150vh] w-[150vw]" />
			</div>
			<div class="w-1/2 poulie" bind:this={pouliesScrollables[1]}>
				<div class=" grid-large h-[300vh] w-[300vw]" />
			</div>
		</div>
		<p class="mx-auto mt-2 small">
			Notice that the speed is different depending the container you scroll on
		</p>
	</section>
</div>

<style lang="postcss">
	.poulie {
		@apply overflow-auto rounded-sm border;
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
