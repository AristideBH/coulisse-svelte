const dico = {
    emoji: "☸️",
    poulieSingular: "poulie",
    pouliePlural: "poulies",
};

interface ScrollPercentages {
    scrollYPercentage: number;
    scrollXPercentage: number;
}

type CoulisseOptions = {
    bindBody?: boolean;
    direction?: "y" | "x" | 'both';
    rounding?: number;
    debug?: boolean;
}

const defaultOptions: CoulisseOptions = {
    direction: 'both',
    bindBody: true,
    rounding: 1,
    debug: false,
};

const round = (val: number, decimals: number): number => {
    const rounded = +(Math.round(+(val.toFixed(decimals) + "e+" + decimals)) + "e-" + decimals);
    return rounded;
};

/**
 * Initializes Coulisse, a scroll synchronization utility, to enable synchronized scrolling
 * for a group of HTML elements.
 *
 * @param {HTMLElement[]} elements - An array of HTML elements to enable synchronized scrolling.
 * @param {CoulisseOptions} [options=defaultOptions] - Optional settings for scroll synchronization.
 */
const coulisse = (elements: HTMLElement[], options: CoulisseOptions = defaultOptions): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const debugPrompt = (toLog: any, coords = false): void => {
        if (!options.debug) return;
        const message = coords
            ? `${dico.emoji}\t\tx: ${toLog.xScrollPercentage}% \t|\ty: ${toLog.yScrollPercentage}%`
            : `${dico.emoji} ${toLog}`;

        console.log(message);
    };

    /**
     * Calculates the scroll percentages in both vertical and horizontal directions.
     *
     * @param {object} options - An object containing scroll position information.
     * @param {number} options.scrollTop - The current vertical scroll position.
     * @param {number} options.scrollLeft - The current horizontal scroll position.
     * @param {number} height - The total height of the scrollable area.
     * @param {number} width - The total width of the scrollable area.
     *
     * @returns {object} - An object containing scroll percentages.
     * @property {number} scrollYPercentage - The vertical scroll percentage (0-100).
     * @property {number} scrollXPercentage - The horizontal scroll percentage (0-100).
     */
    const getScrollPercentages = (
        { scrollTop, scrollLeft }: { scrollTop: number; scrollLeft: number },
        height: number,
        width: number
    ): ScrollPercentages => {
        const rounding = options.rounding || 2;
        const scrollYPercentage = round((scrollTop * 100) / height, rounding);
        const scrollXPercentage = round((scrollLeft * 100) / width, rounding);
        return { scrollYPercentage, scrollXPercentage };
    };

    /**
     * Sets the scroll position of an HTMLElement based on specified scroll percentages.
     *
     * @param {HTMLElement} el - The HTML element for which to set the scroll position.
     * @param {ScrollPercentages} scrollPercentages - An object containing scroll percentages.
     * @param {number} scrollPercentages.scrollXPercentage - The horizontal scroll percentage (0-100).
     * @param {number} scrollPercentages.scrollYPercentage - The vertical scroll percentage (0-100).
     * @param {CoulisseOptions} [options=defaultOptions] - Optional settings for the scroll operation.
     *
     * @returns {void}
     */
    const setScrollPercentage = (el: HTMLElement, { scrollXPercentage, scrollYPercentage }: ScrollPercentages, options: CoulisseOptions = defaultOptions): void => {
        // Check if the element is defined and exit early if not.
        if (!el) return;

        // Calculate the maximum scrollable height and width.
        const height = el.scrollHeight - el.getBoundingClientRect().height;
        const width = el.scrollWidth - el.getBoundingClientRect().width;

        // Calculate the desired scroll positions based on percentages.
        const scrollX = (scrollXPercentage * width) / 100;
        const scrollY = (scrollYPercentage * height) / 100;

        // Set the scroll position based on the specified direction or both.
        if (options.direction === 'y') {
            debugPrompt(`Y scroll percentage: ${scrollYPercentage}`);
            el.scrollTop = scrollY;
        } else if (options.direction === 'x') {
            debugPrompt(`X scroll percentage: ${scrollXPercentage}`);
            el.scrollLeft = scrollX;
        } else {
            debugPrompt({ xScrollPercentage: scrollXPercentage, yScrollPercentage: scrollYPercentage }, true);
            el.scrollTop = scrollY;
            el.scrollLeft = scrollX;
        }
    };

    /**
     * Calculates and returns the scroll percentages of the given HTML element.
     *
     * @param {HTMLElement} element - The HTML element for which to calculate scroll percentages.
     *
     * @returns {ScrollPercentages} - An object containing scroll percentages.
     * @property {number} scrollXPercentage - The horizontal scroll percentage (0-100).
     * @property {number} scrollYPercentage - The vertical scroll percentage (0-100).
     */
    const calculateScrollPercentages = (element: HTMLElement): ScrollPercentages => {
        // Extract the current scroll positions and the maximum scrollable dimensions.
        const { scrollTop, scrollLeft } = element;
        const height = element.scrollHeight - element.getBoundingClientRect().height;
        const width = element.scrollWidth - element.getBoundingClientRect().width;

        // Calculate and return the scroll percentages using the getScrollPercentages function.
        return getScrollPercentages({ scrollTop, scrollLeft }, height, width);
    }

    /**
     * Adds a scroll listener to the specified HTML element and synchronizes the scroll position
     * of other elements in the provided list based on the scroll percentages of the target element.
     *
     * @param {HTMLElement} element - The HTML element to which the scroll listener is added.
     * @param {HTMLElement[]} elements - An array of HTML elements to synchronize scroll positions with.
     * @param {CoulisseOptions} options - Settings for the scroll synchronization operation.
     */
    const addScrollListener = (element: HTMLElement, elements: HTMLElement[], options: CoulisseOptions) => {
        // Add a 'scroll' event listener to the target element.
        element.addEventListener('scroll', () => {
            // Calculate scroll percentages for the target element.
            const scrollPercentages = calculateScrollPercentages(element);

            // Synchronize scroll positions of other elements in the list.
            for (const otherElement of elements) {
                if (element !== otherElement) {
                    setScrollPercentage(otherElement, scrollPercentages, options);
                }
            }
        }, { passive: true });
    }


    const poulieTerm = elements.length === 1 || elements.length === 0 ? dico.poulieSingular : dico.pouliePlural;
    debugPrompt(`${elements.length} ${poulieTerm} provided.`);

    // Check if no elements are provided, and deactivate Coulisse if that's the case.
    if (!elements || elements.length === 0) {
        debugPrompt(`Coulisse can't work without ${dico.pouliePlural}\n💤 Deactivating...`);
        return;
    }

    // If there's only one element provided, add a scroll listener for it.
    if (elements.length === 1) {
        const element = elements[0];
        element.addEventListener('scroll', () => {
            setScrollPercentage(element, calculateScrollPercentages(element), options);
        }, { passive: true });

        // Additionally, add a global scroll listener for the same element
        document.addEventListener("scroll", () => {
            setScrollPercentage(element, calculateScrollPercentages(element), options);
        }, { passive: true });
    } else {
        // If multiple elements are provided, add scroll listeners to synchronize their scroll positions.
        for (const element of elements) {
            addScrollListener(element, elements, options);
        }
    }
};

export default coulisse;
export type { CoulisseOptions };
