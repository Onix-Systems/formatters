
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

            this.#instance = new Intl.ListFormat(
                this.#locales,
                this.#options
            );
        } catch(error) {
            console.error('ListFormat is not a constructor. Check list of supports https://tc39.es/ecma402/#sec-intl-listformat-constructor.');
        }
    }

    format(list) {
        return this.#instance.format(list);
    };

    formatToParts(list) {
        return this.#instance.formatToParts(list);
    };
}

export default ListFormat;
