## What does it do ?

Coulisse is a simple Sveltekit component that allows to sync the scroll percentage of multiple elements, or even the body.

## Installation

Use your preferred node package manager.

`npm i @arisbh/coulisse`

`pnpm add @arisbh/coulisse`

`yarn add @arisbh/coulisse`

## Usage

- Import the `coulisse` and `onMount`,
- Define an emtpy array to hold your scrolling elements, here named `poulies`.
- In your markup, bind as many scrolling elements as you like to the array.
- Run coulisse inside onMount, passing the array.

```ts
import { onMount } from 'svelte';
import coulisse from '@arisbh/coulisse';

let poulies: Array<HTMLElement> = [];

onMount(() => coulisse(poulies));
```

```svelte
<div class="overflow-auto" bind:this={poulies[0]}>
	<!-- ... -->
</div>
<div class="overflow-auto" bind:this={poulies[1]}>
	<!-- ... -->
</div>
```

> Note that we're passing a position to the array when binding elements. Please make sure you are incrementing them properly.

## Options

To pass options, you have two solutions.

Directly inside the `coulisse` method :

```js
coulisse(poulies, {
	decimal: 1,
	direction: 'y',
	bindBody: false,
	debug: true
});
```

Or construct an object with the type `coulisseOptions` :

```ts
import { coulisse, type CoulisseOptions } from '@arisbh/coulisse';

const options: CoulisseOptions = {
	decimal: 1,
	direction: 'y',
	bindBody: false,
	debug: true
};

coulisse(poulies, options);
```

Here are the default options when none are passed to the coulisse initialization.

| Props       | Default    | Type                 | Description                                             |
| ----------- | ---------- | -------------------- | ------------------------------------------------------- |
| `direction` | `'both'  ` | `'y', 'x' or 'both'` | This defines the allowed axis for the syncronization    |
| `bindBody`  | `true`     | `boolean`            | Does the scrolling sync applies to the the body element |
| `decimal`   | `3`        | `1, 2, 3, 4 or 5`    | This defines precision of the calculated percentage     |
| `debug`     | `false`    | `boolean`            | Logs debugging informations in the console              |

### bindBody

As its name suggest, this options allows to sync the body scroll to your desired element.
To make it work, you must pass at least one poulie with this options enabled.

## Caveats

- Unfortunately, using CSS proprety `scroll-behavior: smooth;` to set smooth scrolling break the use of Coulisse.
  If you need to scroll to an anchor programaticaly, I have found that [svelte-scrollto](https://github.com/utherpally/svelte-scrollto-scrollto), even if archived, works well.

If your encountered any bugs, feel free to open an issue on the Github page !
