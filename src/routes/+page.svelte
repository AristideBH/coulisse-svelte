<script lang="ts">
	import { onMount } from 'svelte';
	import coulisse from '$lib/coulisse.js';

	let poulies: HTMLElement[] = [];
	onMount(() => coulisse(poulies));
</script>

<main>
	<div bind:this={poulies[0]}><div class="long" /></div>
	<div bind:this={poulies[1]}><div class="longer" /></div>
</main>

<style global>
	:global(body) {
		margin: 0;
		padding: 0;
	}
	main {
		height: 100svh;
		display: flex;
	}
	main > div {
		width: 50vw;
		overflow: auto;
	}
	div > div {
		background-color: #ffffff;
		opacity: 0.8;
		background-image: linear-gradient(#c2c2c2 2px, transparent 2px),
			linear-gradient(90deg, #c2c2c2 2px, transparent 2px),
			linear-gradient(#c2c2c2 1px, transparent 1px),
			linear-gradient(90deg, #c2c2c2 1px, #ffffff 1px);
		background-size: 50px 50px, 50px 50px, 10px 10px, 10px 10px;
		background-position: -2px -2px, -2px -2px, -1px -1px, -1px -1px;
	}
	.long {
		height: 20000px;
		/* width: 20000px; */
	}
	.longer {
		height: 40000px;
		/* width: 40000px; */
	}
</style>
