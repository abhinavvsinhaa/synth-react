

/**
 * @returns whether the provided parameter is undefined.
 */
export function isUndefined(obj: unknown): obj is undefined {
    return (typeof obj === 'undefined');
}

/**
 * @returns whether the provided parameter is undefined or null.
 */
export function isUndefinedOrNull(obj: unknown): obj is undefined | null {
    return (isUndefined(obj) || obj === null);
}

/**
 * Asserts that the argument passed in is neither undefined nor null.
 */
export function assertIsDefined<T>(arg: T | null | undefined): T {
    if (isUndefinedOrNull(arg)) {
        throw new Error('Assertion Failed: argument is undefined or null');
    }

    return arg;
}