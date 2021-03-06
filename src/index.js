import __NumberFormat__ from './NumberFormat';
import __ListFormat__ from './ListFormat';
import __DateTimeFormat__ from './DateTimeFormat';

/**
 * After Polyfills is initialized
 *
 * @exports NumberFormat
 */
export function NumberFormat(number, options) {
    return new __NumberFormat__(number, options);
}


/**
 * After Polyfills is initialized
 *
 * @exports ListFormat
 */
export function ListFormat(number, options) {
    return new __ListFormat__(number, options);
}


/**
 * After Polyfills is initialized
 *
 * @exports DateTimeFormat
 */
export function DateTimeFormat(number, options) {
    return new __DateTimeFormat__(number, options);
}