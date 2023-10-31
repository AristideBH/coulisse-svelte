Feel free to suggest other use-case on the [GitHub page](https://github.com/AristideBH/coulisse-svelte) or to share your implementation !

## Scrollbar

In your `+layout.svelte` :

```svelte
<script>
	import { onMount } from 'svelte';
	import coulisse, Scrollbar from '@arisbh/coulisse';

	let Scrollbar: HTMLElement[] = [];

	onMount(() => {
		coulisse(Scrollbar, { bindBody: true });
	});
</script>

<slot />

<Scrollbar />
```

### Customization

- Style (colors, cursor...)
- Auto-hide

## Parallax
