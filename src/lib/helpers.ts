import type { CoulisseOptions } from "$lib";
import type { Mandatory } from "./types";

// * Dictionary
export const terms = {
    emoji: "☸️",
    singular: "poulie",
    plural: "poulies",
    quit: '\n💤 Deactivating...',
    yScroll: `Y scroll percentage:`,
    xScroll: `x scroll percentage:`,
};

export const prompts = {
    noPoulies: `Coulisse can't work without ${terms.plural}. ${terms.quit}.`,
    bodyAlert: `You only provided one ${terms.singular} with no bindBody option.${terms.quit}`
}


// * Default options 
export const defaults: Mandatory<CoulisseOptions> = {
    direction: 'both',
    bindBody: true,
    decimal: 3,
    debug: false,
};


// * Functions
export const round = (val: number, decimals: number): number => {
    const multiplier = Math.pow(10, decimals);
    return Math.round(val * multiplier) / multiplier;
};


export const debugCoords = (options: CoulisseOptions, coords: object) => {
    if (!options.debug) return;
    console.log(coords)
}
export const debugPrompts = (options: CoulisseOptions, prompt: string) => {
    if (!options.debug) return;
    console.log(prompt)
}

