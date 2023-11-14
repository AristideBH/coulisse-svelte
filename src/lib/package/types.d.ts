export interface ScrollPercentages {
    scrollYPercentage: number;
    scrollXPercentage: number;
}

export type CoulisseOptions = {
    bindBody?: boolean;
    direction?: "y" | "x" | 'both';
    decimal?: 1 | 2 | 3 | 4 | 5;
    debug?: boolean;
}

export type Mandatory<T> = {
    [K in keyof T]-?: T[K];
};