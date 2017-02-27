# power-range [![Build status](https://travis-ci.org/alcidesqueiroz/power-range.svg?branch=master)](https://travis-ci.org/alcidesqueiroz/power-range)

> A small and powerful library for creating ranges of almost anything: numbers, letters, dates and even strings! Yay!

![It's morphing time!](https://gist.githubusercontent.com/alcidesqueiroz/c3d6c6edc559194bc37a2c464a21768d/raw/ef5e0b9ddb81de6eba46761a39226d4e242cf3fa/power-range.gif)

## Install

```
$ npm install --save power-range
```

## Usage

### create(from, to[, options])

Creates an array with the range between two values.

```js
const Range = require('power-range');

// Number ranges
Range.create(0, 5);
//=> [0, 1, 2, 3, 4 ,5]

Range.create(-2, 5);
//=> [-2, -1, 0, 1 , 2, 3, 4, 5]

Range.create(100, 100);
//=> [100]

// Options
/**
 * increment: The interval between the range values
 */
Range.create(2, 10, { increment: 2 });
//=> [2, 4, 6, 8, 10]

Range.create(-2, 13, { increment: 3 });
//=> [-2, 1, 4, 7, 13]


// Date ranges
Range.create(new Date(2001, 2, 30, 4, 5, 6), new Date(2001, 3, 2, 6, 7, 8));
/**
 * => [ Fri Mar 30 2001 04:05:06 GMT-0300 (BRT),
 *      Sat Mar 31 2001 04:05:06 GMT-0300 (BRT),
 *      Sun Apr 01 2001 04:05:06 GMT-0300 (BRT),
 *      Mon Apr 02 2001 04:05:06 GMT-0300 (BRT) ]
 */

// Options
/**
 * increment: The interval between the range values
 */
Range.create(new Date(2001, 2, 30, 4, 5, 6), new Date(2001, 3, 2, 6, 7, 8), { increment: 2 });
/**
 * => [ Fri Mar 30 2001 04:05:06 GMT-0300 (BRT),
 *      Sun Apr 01 2001 04:05:06 GMT-0300 (BRT) ]
 */

/**
 * unit: The unit of time used to build the range (second, minute, hour, day, week, month)
 */
Range.create(new Date(2001, 2, 30, 4, 5, 6), new Date(2001, 6, 30, 4, 5, 6), { unit: 'month' });
/**
 * => [ Fri Mar 30 2001 04:05:06 GMT-0300 (BRT),
 *      Mon Apr 30 2001 04:05:06 GMT-0300 (BRT),
 *      Wed May 30 2001 04:05:06 GMT-0300 (BRT),
 *      Sat Jun 30 2001 04:05:06 GMT-0300 (BRT),
 *      Mon Jul 30 2001 04:05:06 GMT-0300 (BRT) ]
 */

// String ranges
Range.create('A', 'G');
//=> ['A', 'B', 'C', 'D', 'E', 'F', 'G']

Range.create('X', 'd');
//=> ['X', 'Y', 'Z', 'a', 'b', 'c', 'd']

Range.create('DA', 'DD');
//=> ['DA', 'DB', 'DC', 'DD']

Range.create('AZ', 'BA');
//=> ['AZ', 'BA']

Range.create('6', 'B');
//=> ['6', '7', '8', '9', 'A', 'B']

Range.create('6', 'b');
//=> ['6', '7', '8', '9', 'a', 'b']

Range.create('z', 'ab');
//=> ['z', 'aa', 'ab']

Range.create('ZY', 'AAB');
//=> ['ZY', 'ZZ', 'AAA', 'AAB']

Range.create('98', '002');
//=> ['98', '99', '000', '001', '002']


// Options
/**
 * numbers: Enables numbers (if one of the limit values has a number,
 *          this option is enabled automatically)
 */
Range.create('AZ', 'BA', { numbers: true });
//=> ['AZ', 'B0', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'BA']

/**
 * upperCaseLetters: Enables uppercase letters (if one of the limit values
 *                   has an uppercase letter, this option is enabled automatically)
 */
Range.create('6', 'b', { upperCaseLetters: true });
//=> ['6', '7', '8', '9', 'A', 'B', ..., 'X', 'Y', 'Z', 'a', 'b'])

/**
 * lowerCaseLetters: Enables lowercase letters (if one of the limit values
 *                   has a lowercase letter, this option is enabled automatically)
 */
Range.create('Z', 'AB', { lowerCaseLetters: true });
//=> ['Z', 'a', 'b', 'c', 'd', 'e', ..., 'x', 'y', 'z', 'AA', 'AB'])

/**
 * chars: Customizes the characters used to build the string range
 */
Range.create('$', '%#', { chars: '$%#' });
//=> ['$', '%', '#', '$$', '$%', '$#', '%$', '%%', '%#']
```

## Author

Alcides Queiroz Aguiar

-	E-mail: alcidesqueiroz <at> gmail
-	Twitter: [@alcidesqueiroz](http://www.twitter.com/alcidesqueiroz)
-	Stack Overflow: [http://is.gd/aqanso](http://stackoverflow.com/users/1295666/alcides-queiroz-aguiar)

## License

This code is free to use under the terms of the [MIT License](LICENSE.md).
