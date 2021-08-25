/**
 * @class ListFormat
 */
class ListFormat {
    #locales;
    #options;
    #instance;
    #DEFAULTS = {
        locales: 'en-US',
        options: {}
    }
    /**
     * Creates an instance of ListFormat.
     * @param {String} locales
     * @param {Object} options
     * @memberof ListFormat
     */
    constructor(locales, options) {
        try {
            this.#locales = locales ?? this.#DEFAULTS.locales;
            this.#options = {
                ...this.#DEFAULTS.options,
                ...options
            };

            this.#instance = new Intl.ListFormat(
                this.#locales,
                this.#options
            );
        } catch(error) {
            console.error('ListFormat is not a constructor. Check list of supports https://tc39.es/ecma402/#sec-intl-listformat-constructor.');
        }
    }

    /**
     * @param {String[]} list
     * @return {String}
     * @memberof ListFormat
     */
    format(list) {
        return this.#instance.format(list);
    };

    /**
     * @param {String[]} list
     * @return {Object}
     * @memberof ListFormat
     */
    formatToParts(list) {
        return this.#instance.formatToParts(list);
    };
}

export default ListFormat;
