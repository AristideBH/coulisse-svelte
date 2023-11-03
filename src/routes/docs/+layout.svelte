<script lang="ts">
	import { onMount } from 'svelte';
	import '../../../node_modules/prism-themes/themes/prism-vsc-dark-plus.min.css';

	onMount(async () => {
		let CodeBlocks = document.getElementsByTagName('pre');
		Array.from(CodeBlocks).forEach((block) => {
			const copyBtn = document.createElement('button');
			const copyText = 'Copy';
			const copiedText = '✓ Copied';
			// Set the button's attributes
			copyBtn.innerHTML = copyText;

			// Add an event listener to the button (optional)
			copyBtn.addEventListener('click', () => {
				const code = block.getElementsByTagName('code')[0].textContent;

				if (!code) return;

				try {
					navigator.clipboard.writeText(code);
				} catch (error) {
					console.error('An error occured copying the code', error);
				}

				copyBtn.classList.add('success');
				copyBtn.innerHTML = copiedText;

				window.setTimeout(function () {
					copyBtn.classList.remove('success');
					copyBtn.innerHTML = copyText;
				}, 1500);
			});

			block.appendChild(copyBtn);
		});
	});
</script>

<svelte:head>
	<title>Coulisse - Documentation</title>
</svelte:head>

<slot />

<footer class="flex flex-wrap items-center pt-8 mt-48 border-t gap-x-3 gap-y-1">
	<span class="me-auto">
		Made with ♡ by <a href="https://github.com/AristideBH">@AristideBH</a>
	</span>
	<span class="flex gap-3">
		<a href="/docs">Docs</a>
		<a href="https://github.com/AristideBH/coulisse-svelte" target="_blank">GitHub</a>
	</span>
</footer>
