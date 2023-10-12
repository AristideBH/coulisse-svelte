<script lang="ts">
	import { onMount } from 'svelte';
	import coulisse from '$lib';

	let poulies: HTMLElement[] = [];
	onMount(() => coulisse(poulies, { decimal: 3, debug: true, bindBody: true }));
</script>

<main>
	<section bind:this={poulies[0]}><div class="long" /></section>
	<section bind:this={poulies[1]}><div class="longer" /></section>
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

	section {
		width: 50%;
		overflow: auto;
	}

	div {
		background-color: #ffffff;
		opacity: 0.8;
		background-image: linear-gradient(#c2c2c2 2px, transparent 2px),
			linear-gradient(90deg, #c2c2c2 2px, transparent 2px),
			linear-gradient(#c2c2c2 1px, transparent 1px),
			linear-gradient(90deg, #c2c2c2 1px, #ffffff 1px);
	}

	.long {
		height: 20000px;
		width: 20000px;
		background-size: 50px 50px, 50px 50px, 10px 10px, 10px 10px;
		background-position: -2px -2px, -2px -2px, -1px -1px, -1px -1px;
	}

	.longer {
		height: 40000px;
		width: 40000px;
		background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
		background-position: -4px -4px, -4px -4px, -2px -2px, -2px -2px;
	}
</style>
