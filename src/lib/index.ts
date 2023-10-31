// Reexport your entry components here
import coulisse from "./coulisse.js";
import type { CoulisseOptions as Options } from "./types.js";
import Scrollbar from "./Scrollbar.svelte";

export default coulisse
export type CoulisseOptions = Options
export { Scrollbar }