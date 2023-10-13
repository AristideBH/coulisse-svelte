import type { Mandatory, CoulisseOptions, ScrollPercentages } from "./types";

// * Dictionary
export const terms = {
    emoji: "☸️",
    singular: "poulie",
    plural: "poulies",
    quit: '\n💤 Deactivating...',
    yScroll: `Y scroll %:`,
    xScroll: `x scroll %:`,
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

export const debug = (options: CoulisseOptions, message: string | ScrollPercentages) => {
    if (!options.debug) return;

    if (typeof message === 'string') {
        console.log(terms.emoji, message);
    } else if (typeof message === 'object') {
        console.log(terms.emoji, message);
    }
};