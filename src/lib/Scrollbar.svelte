<script lang="ts">
	import { onMount } from 'svelte';
	import coulisse from '$lib';

	let scrollbar: HTMLElement[] = [];

	onMount(() => {
		coulisse(scrollbar, { bindBody: true, debug: true });
	});
</script>

<div class="track" bind:this={scrollbar[0]}>
	<div class="w-[3px] thumb h-[1000vh]"></div>
</div>

<style>
	.track {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		width: 50px;
		background-color: blue;
		z-index: 100;
		overflow-y: auto;
	}

	.thumb {
		background-color: red;
	}
</style>
