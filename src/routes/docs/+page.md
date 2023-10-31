## Installation

`npm i @arisbh/coulisse`

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

Then, you just have to bind the elements to the array :

```html
<div class="h-full poulie" bind:this="{poulies[0]}">
	<div class="grid-bg h-[250vh]" />
</div>
```

Note that we're passing a position to the array. Please make sure you're incrementing them properly.

## Options

Here are the default options when none are passed to the coulisse initialization.

| Props       | Default    | Type                 | Description                                                       |
| ----------- | ---------- | -------------------- | ----------------------------------------------------------------- |
| `direction` | `'both'  ` | `'y', 'x' or 'both'` | This defines the allowed axis for the syncronization              |
| `bindBody`  | `true`     | `boolean`            | Will the scrolling syncronization applies to the the body element |
| `decimal`   | `3`        | `1, 2, 3, 4 or 5`    | This defines precision of the calculated percentage               |
| `debug`     | `false`    | `boolean`            | Check your console with this on to get more info on your setup    |

To pass options, you have two solutions.

- Directly inside the `coulisse` method :

```js
coulisse(poulies, {
	decimal: 1,
	direction: 'y',
	bindBody: false,
	debug: true
});
```

- or using `coulisseOptions` type to create an object.

```ts
import { type CoulisseOptions } from '@arisbh/coulisse';

const options: CoulisseOptions = {
	decimal: 1,
	direction: 'y',
	bindBody: false,
	debug: true
};
coulisse(poulies, options);
```
