<div aria-hidden="true" aria-label="Scroll to see">&nbsp;</div>

<style>
	@keyframes scroll-down {
		0% {
			opacity: 0;
		}
		30% {
			opacity: 1;
		}
		60% {
			opacity: 1;
		}
		100% {
			opacity: 0;
			top: 90%;
		}
	}
	div {
		margin-top: 1rem;
		position: absolute;
		left: 50%;
		height: 40px;
		width: 30px;
		border: 2px hsl(var(--muted-foreground)) solid;
		border-radius: 40px;
		text-decoration: none;
	}

	div:hover,
	div:focus {
		text-decoration: none;
	}

	div:before {
		content: '';
		position: absolute;
		top: 20%;
		left: 50%;
		border: 2px solid hsl(var(--muted-foreground));
		height: 10px;
		width: 10px;
		transform: translate(-50%, -50%) rotate(45deg);
		border-top: transparent;
		border-left: transparent;
		animation: scroll-down 2.5s linear infinite;
	}
</style>
