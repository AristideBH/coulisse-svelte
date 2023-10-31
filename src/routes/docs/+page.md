## Installation

Use your preferred node package manager.

`npm i @arisbh/coulisse`

`pnpm add @arisbh/coulisse`

`yarn add @arisbh/coulisse`

## Usage

First import the `coulisse` and `onMount`, and define an emtpy array to hold your scrolling elements, here named `poulies`.

Then simply run coulisse, passing the array.

```ts
import { onMount } from 'svelte';
import coulisse from '@arisbh/coulisse';

let poulies: HTMLElement[] = [];

onMount(() => {
	coulisse(poulies);
});
```

Finally, in your markup, just bind your scrolling elements to the array :

```html
<div class="overflow-auto" bind:this="{poulies[0]}">
	<!-- ... -->
</div>
<div class="overflow-auto" bind:this="{poulies[1]}">
	<!-- ... -->
</div>
<!-- ... -->
```

Note that we're passing a position to the array. Please make sure you're incrementing them properly.

You can pass as many poulies as you like !

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

| Props       | Default    | Type                 | Description                                                       |
| ----------- | ---------- | -------------------- | ----------------------------------------------------------------- |
| `direction` | `'both'  ` | `'y', 'x' or 'both'` | This defines the allowed axis for the syncronization              |
| `bindBody`  | `true`     | `boolean`            | Will the scrolling syncronization applies to the the body element |
| `decimal`   | `3`        | `1, 2, 3, 4 or 5`    | This defines precision of the calculated percentage               |
| `debug`     | `false`    | `boolean`            | Check your console with this on to get more info on your setup    |

### bindBody

As its name suggest, this options allows to sync the body scroll to your desired element.
You must passed at least one poulie to the coulisse method with this options enabled for it to work.

## Caveats

use of smooth scroll
