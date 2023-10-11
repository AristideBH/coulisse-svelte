<script lang="ts">
	import { onMount } from 'svelte';
	import coulisse from '$lib/index';
	let poulie: HTMLElement[] = [];

	onMount(() => coulisse(poulie, { debug: true, bindBody: true }));
</script>

<div bind:this={poulie[0]}>test</div>
