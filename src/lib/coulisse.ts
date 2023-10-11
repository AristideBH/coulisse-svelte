const dico = {
    emoji: "☸️",
    poulieSingular: "poulie",
    pouliePlural: "poulies"
}

enum Directions {
    XY = "all",
    X = "horizontal",
    Y = "vertical"
}

interface ScrollPercentages {
    scrollYPercentage: number;
    scrollXPercentage: number
}

interface Options {
    bindBody?: boolean, // When providing only one element to coulisse, do you want to sync its scroll with the body element ? Defaults to true
    direction?: Directions, // Allow selection of the axis used when scrolling, defaults to both X and Y
    rounding?: number, // Recommended '1' for short content, max to '5' for long content. Setting an integer as % can be choppy for long overflowing content, but a high decimal point produce unexpected jittery scrolling. The option basically set the number of decimal when rounding the scroll percentage. Defaults to 2
    debug?: boolean // Show debug prompts in the console, defaults to false
}

const defaultOptions: Options = {
    bindBody: true,
    rounding: 1,
    debug: false
}

const round = (val: number, decimals: number) => {
    return +(Math.round(+(val.toFixed(decimals) + "e+" + decimals)) + "e-" + decimals);
}

const coulisse =
    (elements: HTMLElement[], options: Options = defaultOptions) => {

        // * FUNCTION DEFINITIONS
        // Log a message to the console if debug mode is enabled
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const debugPrompt = (toLog: any, coords = false): void => {
            if (!options.debug) return // Return if debug mode is not enabled
            if (coords) { // Specific layout for loging scroll coordinates
                console.log(`${dico.emoji} x: ${toLog.xScrollPercentage} \t|\ty: ${toLog.yScrollPercentage}`);
                return
            }
            console.log(`${dico.emoji} ${toLog}`);
        }

        // Get the scroll percentage of an element in the X and Y direction
        const getScrollPercentages =
            (scrolls: { scrollTop: number; scrollLeft: number; }, height: number, width: number): ScrollPercentages => {
                const scrollYPercentage = round((scrolls.scrollTop * 100) / height, options.rounding || 2);
                const scrollXPercentage = round((scrolls.scrollLeft * 100) / width, options.rounding || 2);
                return { scrollYPercentage, scrollXPercentage }
            };

        // Set the scroll position of an element based on the provided percentage values
        const setScrollPercentage =
            (el: HTMLElement, percentages: ScrollPercentages): void => {
                if (el) {
                    const height = el.scrollHeight - el.getBoundingClientRect().height;
                    const width = el.scrollWidth - el.getBoundingClientRect().width;
                    switch (options.direction) { // Filter the scroll X or Y based on the provided option
                        case Directions.Y:
                            debugPrompt(`Y scroll percentage : ${percentages.scrollYPercentage}`)
                            el.scrollTop = (percentages.scrollYPercentage * height) / 100;
                            break;
                        case Directions.X:
                            debugPrompt(`X scroll percentage : ${percentages.scrollXPercentage}`)
                            el.scrollLeft = (percentages.scrollXPercentage * width) / 100;
                            break;
                        default:
                            debugPrompt({ xScrollPercentage: percentages.scrollXPercentage, yScrollPercentage: percentages.scrollYPercentage }, true)
                            el.scrollTop = (percentages.scrollYPercentage * height) / 100;
                            el.scrollLeft = (percentages.scrollXPercentage * width) / 100;
                            break;
                    }
                }
            };

        // Set the scroll position of the body element based on the provided percentage values
        const setBodyScrollPosition =
            (percentages: ScrollPercentages): void => {
                switch (options.direction) { // Filter the scroll X or Y based on the provided option
                    case Directions.Y:
                        window.scrollTo({
                            top: (document.body.scrollHeight - window.innerHeight) * (percentages.scrollYPercentage / 100),
                            left: document.body.scrollLeft,
                            behavior: 'auto'
                        });
                        break;
                    case Directions.X:
                        window.scrollTo({
                            top: document.body.scrollTop,
                            left: (document.body.scrollWidth - window.innerWidth) * (percentages.scrollXPercentage / 100),
                            behavior: 'auto'
                        });
                        break;
                    default:
                        window.scrollTo({
                            top: (document.body.scrollHeight - window.innerHeight) * (percentages.scrollYPercentage / 100),
                            left: (document.body.scrollWidth - window.innerWidth) * (percentages.scrollXPercentage / 100),
                            behavior: 'auto'
                        });
                        break;
                }
            }

        // Define term to use depending on the number of elements provided
        const poulieTerm = (elements.length == 1 || elements.length == 0) ? dico.poulieSingular : dico.pouliePlural;
        debugPrompt(`${elements.length} ${poulieTerm} provided.`) // Log the number of provided element

        // * CODE FUNCTIONNALITY
        // Log a message if there are no elements
        if (!elements || elements.length == 0) {
            debugPrompt(`Coulisse can't work without ${dico.pouliePlural} \n💤 Deactivating...`)
            return
        }
        // If only one element is provided to the coulisse
        if (elements.length === 1) {
            if (!options.bindBody) return // Disable the body scroll binding according to custom options
            // Scrolling on the provided element
            if ((elements !== undefined) && (elements[0] !== undefined)) {
                elements[0].addEventListener('scroll', () => {
                    const scrollYPercentage = round(elements[0].scrollTop / (elements[0].scrollHeight - elements[0].offsetHeight) * 100, options.rounding || 2);
                    const scrollXPercentage = round(elements[0].scrollLeft / (elements[0].scrollWidth - elements[0].offsetWidth) * 100, options.rounding || 2);
                    setBodyScrollPosition({ scrollYPercentage, scrollXPercentage })
                }, { passive: true });

                // Scrolling the body element
                document.addEventListener("scroll", () => {
                    const scrollYPercentage = round(window.scrollY / (document.body.offsetHeight - window.innerHeight) * 100, options.rounding || 2);
                    const scrollXPercentage = round(window.scrollX / (document.body.offsetWidth - window.innerWidth) * 100, options.rounding || 2);
                    setScrollPercentage(elements[0], { scrollYPercentage, scrollXPercentage });
                }, { passive: true });
            }
            return;
        }
        // else if multiple elements are provided
        elements.forEach((element) => {
            element.addEventListener('scroll', (event) => {
                const { scrollTop, scrollLeft } = element;
                const height = element.scrollHeight - element.getBoundingClientRect().height;
                const width = element.scrollWidth - element.getBoundingClientRect().width;
                const scrollPercentages = getScrollPercentages({ scrollTop, scrollLeft }, height, width);
                const target = event.target as HTMLElement;

                elements.forEach(otherElement => {
                    if (target !== otherElement) { // Omit the currently scrolled element
                        setScrollPercentage(otherElement, scrollPercentages);
                    }
                });
            }, { passive: true }
            );
        });

        return;

    };

export default coulisse;
export { Directions, defaultOptions }
export type { Options }
