<script lang="ts">
	import { onMount } from 'svelte';
	import coulisse from '$lib';

	let pouliesBody: HTMLElement[] = [];
	onMount(() => coulisse(pouliesBody, { decimal: 1 }));

	let pouliesScrollables: HTMLElement[] = [];
	onMount(() => coulisse(pouliesScrollables, { decimal: 1 }));
</script>

<main class="h-[250vh] flex flex-col justify-between gap-5">
	<section class="sticky top-[10vh] h-[40vh] flex flex-col gap-1 pt-5">
		<p>This container is synced to the body.</p>
		<div class="h-full poulie" bind:this={pouliesBody[0]}>
			<div class="grid-bg h-[250vh]" />
		</div>
		<p class="mx-auto mt-2 small">Scroll either in the container or in the body</p>
	</section>
	<section class="mt-5">
		<p class="mt-auto">These two containers are synced on both axis.</p>
		<div class="flex h-[34vh] gap-3 mb-5">
			<div class="w-1/2 poulie" bind:this={pouliesScrollables[0]}>
				<div class=" h-[250vh] w-[250vh]" />
			</div>
			<div class="w-1/2 poulie" bind:this={pouliesScrollables[1]}>
				<div class=" grid-large h-[500vh] w-[500vh]" />
			</div>
		</div>
	</section>
</main>

<style lang="postcss">
	.poulie {
		@apply overflow-auto rounded-sm;
	}

	.poulie > div {
		opacity: 0.2;
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
