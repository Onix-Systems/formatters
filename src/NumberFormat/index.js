
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

    format(number) {
        return this.#instance.format(number);
    };

    formatToParts(number) {
        return this.#instance.formatToParts(number);
    };

    resolvedOptions(number) {
        return this.#instance.resolvedOptions(number);
    };
}

export default NumberFormat;
