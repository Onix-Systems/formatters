/**
 * @class NumberFormat
 */
class NumberFormat {
    #locales;
    #options;
    #instance;
    #DEFAULTS = {
        locales: 'en-US',
        options: {
            style: 'decimal'
        }
    }

    /**
     *
     * @param {String|Void} locales
     * @param {Object} options
     */
    constructor(locales, options) {
        try {
            this.#locales = locales ?? this.#DEFAULTS.locales;
            this.#options = {
                ...this.#DEFAULTS.options,
                ...options
            };

            this.#instance = new Intl.NumberFormat(
                this.#locales,
                this.#options
            );
        } catch(error) {
            console.error('NumberFormat is not a constructor. Check list of supports https://tc39.es/ecma402/#numberformat-objects.');
        }
    }

    /**
     * @param {Number} number
     * @return {String}
     * @memberof NumberFormat
     */
    format(number) {
        return this.#instance.format(number);
    };

    /**
     * @param {Number} number
     * @return {Any[]}
     * @memberof NumberFormat
     */
    formatToParts(number) {
        return this.#instance.formatToParts(number);
    };

    /**
     * @param {Number} number
     * @return {Object}
     * @memberof NumberFormat
     */
    resolvedOptions(number) {
        return this.#instance.resolvedOptions(number);
    };
}

export default NumberFormat;
