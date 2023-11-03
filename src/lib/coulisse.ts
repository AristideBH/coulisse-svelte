import type { CoulisseOptions, ScrollPercentages } from "./types";
import { terms, prompts, round, debug, defaults } from "./helpers";
/**
 * Initializes Coulisse, a scroll synchronization utility, to enable synchronized scrolling for a group of HTML elements.
 *
 * @param {HTMLElement[]} elements - An array of HTML elements to enable synchronized scrolling.
 * @param {CoulisseOptions} [options=defaults] - Optional settings for scroll synchronization.
 */

const coulisse = (elements: HTMLElement[], options: CoulisseOptions = defaults): void => {

    // Merged passed options with defaults
    const opt = { ...defaults, ...options }

    // * INITIAL CHECK
    /**
    * This section determines the correct term for "poulie" based on the number of elements.
    */
    const targetNumber = elements.length,
        poulieTerm = targetNumber <= 1 ? terms.singular : terms.plural;
    debug(opt, `${targetNumber} ${poulieTerm} provided.`);

    // Check if elements are provided, and deactivate Coulisse if that's the case.
    if (!elements || targetNumber === 0) {
        debug(opt, prompts.noPoulies);
        return;
    }


    // * HELPERS FUNCTIONS
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
        const decimal = opt.decimal || defaults.decimal,
            scrollYPercentage = round((scrollTop * 100) / height, decimal),
            scrollXPercentage = round((scrollLeft * 100) / width, decimal);
        return { scrollYPercentage, scrollXPercentage };
    };


    /**
     * Sets the scroll position of an HTMLElement based on specified scroll percentages.
     *
     * @param {HTMLElement} el - The HTML element for which to set the scroll position.
     * @param {ScrollPercentages} scrollPercentages - An object containing scroll percentages.
     * @param {number} scrollPercentages.scrollXPercentage - The horizontal scroll percentage (0-100).
     * @param {number} scrollPercentages.scrollYPercentage - The vertical scroll percentage (0-100).
     * @param {CoulisseOptions} [options=defaults] - Optional settings for the scroll operation.
     *
     * @returns {void}
     */
    const setScrollPercentage = (el: HTMLElement, { scrollXPercentage, scrollYPercentage }: ScrollPercentages, options: CoulisseOptions = defaults): void => {
        // Check if the element is defined and exit early if not.
        if (!el) return;

        // Calculate the maximum scrollable height and width.
        const height = el.scrollHeight - el.getBoundingClientRect().height,
            width = el.scrollWidth - el.getBoundingClientRect().width;

        // Calculate the desired scroll positions based on percentages.
        const scrollX = (scrollXPercentage * width) / 100,
            scrollY = (scrollYPercentage * height) / 100;

        // Set the scroll position based on the specified direction or both.
        if (options.direction === 'y') {
            debug(options, `${terms.yScroll} ${scrollYPercentage}`);
            el.scrollTop = scrollY;
        } else if (options.direction === 'x') {
            debug(options, `${terms.xScroll} ${scrollXPercentage}`);
            el.scrollLeft = scrollX;
        } else {
            debug(options, { scrollXPercentage, scrollYPercentage })
            el.scrollTop = scrollY;
            el.scrollLeft = scrollX;
        }

        // debug(options, { scrollYPercentage, scrollXPercentage })

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
        const { scrollTop, scrollLeft } = element,
            height = element.scrollHeight - element.getBoundingClientRect().height,
            width = element.scrollWidth - element.getBoundingClientRect().width;

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


    /**
     * Sets the scroll position of the document body based on the provided scroll percentages and options.
     * @param percentages - An object containing scroll percentage values for scrollY and scrollX.
     * @param percentages.scrollYPercentage - The scroll percentage for the vertical scroll (0 to 100).
     * @param percentages.scrollXPercentage - The scroll percentage for the horizontal scroll (0 to 100).
     */
    const setBodyScrollPosition = (percentages: ScrollPercentages) => {
        const { scrollYPercentage, scrollXPercentage } = percentages;
        const { direction } = options;

        const top = (document.body.scrollHeight - window.innerHeight) * (scrollYPercentage / 100);
        const left = (document.body.scrollWidth - window.innerWidth) * (scrollXPercentage / 100);

        window.scrollTo({
            top: direction === 'y' ? top : (direction === 'x' ? document.body.scrollTop : top),
            left: direction === 'x' ? left : (direction === 'y' ? document.body.scrollLeft : left),
            behavior: 'auto'
        });

        // debug(options, percentages)
    };


    // * SCROLL LISTENERS 

    // If there's only one element provided
    if (targetNumber === 1) {
        // Make sure the bindBody option is set to true, otherwise adding a listener is not necessary.
        if (!opt.bindBody) {
            debug(opt, prompts.bodyAlert)
            return
        }

        const target = elements[0];
        target.addEventListener('scroll', () => {
            const scrollYPercentage = round(target.scrollTop / (target.scrollHeight - target.offsetHeight) * 100, opt.decimal);
            const scrollXPercentage = round(target.scrollLeft / (target.scrollWidth - target.offsetWidth) * 100, opt.decimal);
            setBodyScrollPosition({ scrollYPercentage, scrollXPercentage })
        }, { passive: true });

        // Additionally, add a global scroll listener for the window element
        document.addEventListener("scroll", () => {
            const scrollYPercentage = round(window.scrollY / (document.body.offsetHeight - window.innerHeight) * 100, opt.decimal);
            const scrollXPercentage = round(window.scrollX / (document.body.offsetWidth - window.innerWidth) * 100, opt.decimal);
            setScrollPercentage(target, { scrollYPercentage, scrollXPercentage });
        }, { passive: true });

    } else {
        // If multiple elements are provided, add scroll listeners to synchronize their scroll positions.
        for (const target of elements) {
            addScrollListener(target, elements, opt);
        }
    }
};

export default coulisse;
