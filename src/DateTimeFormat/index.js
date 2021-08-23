class ListFormat {
    #locales;
    #options;
    #instance;
    #DEFAULTS = {
        locales: 'en',
        options: {}
    }

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

    format(date) {
        return this.#instance.format(date);
    };

    formatToParts(date) {
        return this.#instance.formatToParts(date);
    };

    resolvedOptions(date) {
        return this.#instance.resolvedOptions(date);
    };

    formatRange(startDate, endDate) {
        return this.#instance.formatRange(startDate, endDate);
    };

    formatRangeToParts(startDate, endDate) {
        return this.#instance.formatRange(startDate, endDate);
    };
}

export default ListFormat;
