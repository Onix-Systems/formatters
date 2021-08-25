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

            this.#instance = new Intl.DateTimeFormat(
                this.#locales,
                this.#options
            );
        } catch(error) {
            console.error('DateTimeFormat is not a constructor. Check list of supports https://tc39.es/ecma402/#sec-intl-datetimeformat-constructor.');
        }
    }

    /**
     * @param {Date} date
     * @return {String}
     * @memberof ListFormat
     */
    format(date) {
        return this.#instance.format(date);
    };

    /**
     * @param {Date} date
     * @return {Any[]}
     * @memberof ListFormat
     */
    formatToParts(date) {
        return this.#instance.formatToParts(date);
    };

    /**
     * @param {Date} date
     * @return {Object}
     * @memberof ListFormat
     */
    resolvedOptions(date) {
        return this.#instance.resolvedOptions(date);
    };

    /**
     * @param {Date} startDate
     * @param {Date} endDate
     * @return {String}
     * @memberof ListFormat
     */
    formatRange(startDate, endDate) {
        return this.#instance.formatRange(startDate, endDate);
    };

    /**
     * @param {Date} startDate
     * @param {Date} endDate
     * @return {String}
     * @memberof ListFormat
     */
    formatRangeToParts(startDate, endDate) {
        return this.#instance.formatRange(startDate, endDate);
    };
}

export default ListFormat;
