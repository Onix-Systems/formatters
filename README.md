# Formatters

---
**NOTE**

For people who don't like read documentation ;)

---

## Installation

```bash
> npm i formatters
```

## Import

```javascript
const {
    NumberFormat,
    ListFormat,
    DateTimeFormat
} = require('fomratters');
```

## NumberFormat

The NumberFormat object enables language-sensitive number formatting.

```javascript
const { NumberFormat } = require('formatters');

const number = 123456.789;

console.log(NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(10000));
// expected output: "€123,456.79"

// the Japanese yen doesn't use a minor unit
console.log(new NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(number));
// expected output: "￥123,457"

// limit to three significant digits
console.log(new NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(number));
// expected output: "1,23,000"
```

## Instance methods

### ```format();```

The format getter function formats a number into a string according to the locale and formatting options of this NumberFormat object.

Example:

```javascript
const amount = 654321.987;

const options1 = { style: 'currency', currency: 'RUB' };
const numberFormat1 = new NumberFormat('ru-RU', options1);

console.log(numberFormat1.format(amount));
// expected output: "654 321,99 ₽"

const options2 = { style: 'currency', currency: 'USD' };
const numberFormat2 = new NumberFormat('en-US', options2);

console.log(numberFormat2.format(amount));
// expected output: "$654,321.99"
```

### ```formatToParts();```

The formatToParts() method is useful for custom formatting of number strings. It returns an Array of objects containing the locale-specific tokens from which it possible to build custom strings while preserving the locale-specific parts. The structure the formatToParts() method returns example:

```javascript
const number = 3500;

const formatter = new NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR'
});

formatter.formatToParts(number);


// return value:
[
  { type: "integer",  value: "3"   },
  { type: "group",    value: "."   },
  { type: "integer",  value: "500" },
  { type: "decimal",  value: ","   },
  { type: "fraction", value: "00"  },
  { type: "literal",  value: " "   },
  { type: "currency", value: "€"   }
]
```

### ```resolvedOptions();```

The NumberFormat.prototype.resolvedOptions() method returns a new object with properties reflecting the locale and number formatting options computed during initialization of this

Example:

```javascript
const numberFormat1 = new NumberFormat('de-DE');
const options1 = numberFormat1.resolvedOptions();

console.log(options1.locale);
// expected output (Firefox / Safari): "de-DE"
// expected output (Chrome): "de"

console.log(options1.numberingSystem);
// expected output: "latn"

console.log(options1.style);
// expected output: "decimal"
```

The resulting object has the following properties:

```locale```
The BCP 47 language tag for the locale actually used. If any Unicode extension values were requested in the input BCP 47 language tag that led to this locale, the key-value pairs that were requested and are supported for this locale are included in locale.

```numberingSystem```
The value provided for this properties in the options argument, if present, or the value requested using the Unicode extension key "nu" or filled in as a default.

```notation```
The value provided for this property in the options argument, if present, or "standard" filled in as a default.

```compactDisplay```
The value provided for this property in the options argument, or "short" filled in as a default.  This property is only present if the notation is set to "compact".

```signDisplay```
The value provided for this property in the options argument, or "auto" filled in as a default.

```useGrouping```
The values provided for these properties in the options argument or filled in as defaults.

```currency, currencyDisplay```
The values provided for these properties in the options argument or filled in as defaults. These properties are only present if style is "currency".

Only one of the following two groups of properties is included:

```minimumIntegerDigits, minimumFractionDigits, maximumFractionDigits```
The values provided for these properties in the options argument or filled in as defaults. These properties are present only if neither minimumSignificantDigits nor maximumSignificantDigits was provided in the options argument.

```minimumSignificantDigits, maximumSignificantDigits```
The values provided for these properties in the options argument or filled in as defaults. These properties are present only if at least one of them was provided in the options argument.

## ListFormat

The ListFormat object enables language-sensitive list formatting.

```javascript
const vehicles = ['Motorcycle', 'Bus', 'Car'];

const formatter = new ListFormat('en', { style: 'long', type: 'conjunction' });
console.log(formatter.format(vehicles));
// expected output: "Motorcycle, Bus, and Car"

const formatter2 = new ListFormat('de', { style: 'short', type: 'disjunction' });
console.log(formatter2.format(vehicles));
// expected output: "Motorcycle, Bus oder Car"

const formatter3 = new ListFormat('en', { style: 'narrow', type: 'unit' });
console.log(formatter3.format(vehicles));
// expected output: "Motorcycle Bus Car"
```

## Instance methods

### ```format();```

The format() method returns a string that has been formatted based on parameters provided in the ListFormat object. The locales and options parameters customize the behavior of format() and let applications specify the language conventions that should be used to format the list.

Example:

```javascript
const list = ['Motorcycle', 'Bus', 'Car'];

 console.log(new ListFormat('en-GB', { style: 'long', type: 'conjunction' }).format(list));
// > Motorcycle, Bus and Car

 console.log(new ListFormat('en-GB', { style: 'short', type: 'disjunction' }).format(list));
// > Motorcycle, Bus or Car

 console.log(new ListFormat('en-GB', { style: 'narrow', type: 'unit' }).format(list));
// > Motorcycle Bus Car
```

### ```formatToParts();```

Whereas ListFormat.prototype.format() returns a string being the formatted version of the list (according to the given locale and style options), formatToParts() returns an array of the different components of the formatted string.

Each element of the resulting array has two properties: type and value. The type property may be either "element", which refers to a value from the list, or "literal" which refers to a linguistic construct. The value property gives the content, as a string, of the token.

The locale and style options used for formatting are given when constructing the ListFormat instance.

Example:

```javascript
const fruits = ['Apple', 'Orange', 'Pineapple'];
const myListFormat = new ListFormat('en-GB', { style: 'long', type: 'conjunction' });

console.table(myListFormat.formatToParts(fruits));
// [
//  { "type": "element", "value": "Apple" },
//  { "type": "literal", "value": ", " },
//  { "type": "element", "value": "Orange" },
//  { "type": "literal", "value": ", and " },
//  { "type": "element", "value": "Pineapple" }
// ]
```

## DateTimeFormat

The DateTimeFormat object enables language-sensitive date and time formatting.

```javascript
const date = new Date(Date.UTC(2020, 11, 20, 3, 23, 16, 738));
// Results below assume UTC timezone - your results may vary

// Specify default date formatting for language (locale)
console.log(new DateTimeFormat('en-US').format(date));
// expected output: "12/20/2020"

// Specify default date formatting for language with a fallback language (in this case Indonesian)
console.log(new DateTimeFormat(['ban', 'id']).format(date));
// expected output: "20/12/2020"

// Specify date and time format using "style" options (i.e. full, long, medium, short)
console.log(new DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(date));
// Expected output "Sunday, 20 December 2020 at 14:23:16 GMT+11"
```

## Instance methods

### ```format();```

The format getter formats a date into a string according to the locale and formatting options of this DateTimeFormat object.

Example:

```javascript
const options1 = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const date1 = new Date(2012, 5);

const dateTimeFormat1 = new DateTimeFormat('sr-RS', options1);
console.log(dateTimeFormat1.format(date1));
// expected output: "петак, 1. јун 2012."

const dateTimeFormat2 = new DateTimeFormat('en-GB', options1);
console.log(dateTimeFormat2.format(date1));
// expected output: "Friday, 1 June 2012"

const dateTimeFormat3 = new DateTimeFormat('en-US', options1);
console.log(dateTimeFormat3.format(date1));
// expected output: "Friday, June 1, 2012"

```

### ```formatRange();```

The DateTimeFormat.prototype.formatRange() formats a date range in the most concise way based on the locale and options provided when instantiating DateTimeFormat object.

Example:

```javascript
const options1 = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const options2 = { year: '2-digit', month: 'numeric', day: 'numeric' };

const startDate = new Date(Date.UTC(2007, 0, 10, 10, 0, 0));
const endDate = new Date(Date.UTC(2008, 0, 10, 11, 0, 0));

const dateTimeFormat = new DateTimeFormat('en', options1);
console.log(dateTimeFormat.formatRange(startDate, endDate));
// expected output: Wednesday, January 10, 2007 – Thursday, January 10, 2008

const dateTimeFormat2 = new DateTimeFormat('en', options2);
console.log(dateTimeFormat2.formatRange(startDate, endDate));
// expected output: 1/10/07 – 1/10/08

```

```javascript
let date1 = new Date(Date.UTC(2007, 0, 10, 10, 0, 0));
let date2 = new Date(Date.UTC(2007, 0, 10, 11, 0, 0));
let date3 = new Date(Date.UTC(2007, 0, 20, 10, 0, 0));
// > 'Wed, 10 Jan 2007 10:00:00 GMT'
// > 'Wed, 10 Jan 2007 11:00:00 GMT'
// > 'Sat, 20 Jan 2007 10:00:00 GMT'

let fmt1 = new DateTimeFormat("en", {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
});
console.log(fmt1.format(date1));
console.log(fmt1.formatRange(date1, date2));
console.log(fmt1.formatRange(date1, date3));
// > '1/10/07, 10:00 AM'
// > '1/10/07, 10:00 – 11:00 AM'
// > '1/10/07, 10:00 AM – 1/20/07, 10:00 AM'

let fmt2 = new DateTimeFormat("en", {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
});
console.log(fmt2.format(date1));
console.log(fmt2.formatRange(date1, date2));
console.log(fmt2.formatRange(date1, date3));
// > 'Jan 10, 2007'
// > 'Jan 10, 2007'
// > 'Jan 10 – 20, 2007'
```
