# power-range [![Build status](https://travis-ci.com/alcidesqueiroz/power-range.svg?branch=master)](https://travis-ci.com/alcidesqueiroz/power-range)

> 🏋🏻 A small and powerful library for creating ranges of almost anything: numbers, letters, dates and even strings! Yay!

![It's morphing time!](https://gist.githubusercontent.com/alcidesqueiroz/c3d6c6edc559194bc37a2c464a21768d/raw/ef5e0b9ddb81de6eba46761a39226d4e242cf3fa/power-range.gif)

## Install

```
$ npm install power-range
```

## Usage

### create(from, to[, options])

Creates an array with the range between two values.

```js
const pr = require('power-range');

// Number ranges
pr.create(0, 5);
//=> [0, 1, 2, 3, 4 ,5]

pr.create(-2, 5);
//=> [-2, -1, 0, 1 , 2, 3, 4, 5]

pr.create(100, 100);
//=> [100]

// Options
/**
 * increment: The interval between the range values
 */
pr.create(2, 10, { increment: 2 });
//=> [2, 4, 6, 8, 10]

pr.create(-2, 13, { increment: 3 });
//=> [-2, 1, 4, 7, 13]


// Date ranges
pr.create(new Date(2001, 2, 30, 4, 5, 6), new Date(2001, 3, 2, 6, 7, 8));
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
pr.create(new Date(2001, 2, 30, 4, 5, 6), new Date(2001, 3, 2, 6, 7, 8), { increment: 2 });
/**
 * => [ Fri Mar 30 2001 04:05:06 GMT-0300 (BRT),
 *      Sun Apr 01 2001 04:05:06 GMT-0300 (BRT) ]
 */

/**
 * unit: The unit of time used to build the range (second, minute, hour, day, week, month)
 */
pr.create(new Date(2001, 2, 30, 4, 5, 6), new Date(2001, 6, 30, 4, 5, 6), { unit: 'month' });
/**
 * => [ Fri Mar 30 2001 04:05:06 GMT-0300 (BRT),
 *      Mon Apr 30 2001 04:05:06 GMT-0300 (BRT),
 *      Wed May 30 2001 04:05:06 GMT-0300 (BRT),
 *      Sat Jun 30 2001 04:05:06 GMT-0300 (BRT),
 *      Mon Jul 30 2001 04:05:06 GMT-0300 (BRT) ]
 */

// String ranges
pr.create('A', 'G');
//=> ['A', 'B', 'C', 'D', 'E', 'F', 'G']

pr.create('X', 'd');
//=> ['X', 'Y', 'Z', 'a', 'b', 'c', 'd']

pr.create('DA', 'DD');
//=> ['DA', 'DB', 'DC', 'DD']

pr.create('AZ', 'BA');
//=> ['AZ', 'BA']

pr.create('6', 'B');
//=> ['6', '7', '8', '9', 'A', 'B']

pr.create('6', 'b');
//=> ['6', '7', '8', '9', 'a', 'b']

pr.create('z', 'ab');
//=> ['z', 'aa', 'ab']

pr.create('ZY', 'AAB');
//=> ['ZY', 'ZZ', 'AAA', 'AAB']

pr.create('98', '002');
//=> ['98', '99', '000', '001', '002']


// Options
/**
 * numbers: Enables numbers (if one of the limit values has a number,
 *          this option is enabled automatically)
 */
pr.create('AZ', 'BA', { numbers: true });
//=> ['AZ', 'B0', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'BA']

/**
 * upperCaseLetters: Enables uppercase letters (if one of the limit values
 *                   has an uppercase letter, this option is enabled automatically)
 */
pr.create('6', 'b', { upperCaseLetters: true });
//=> ['6', '7', '8', '9', 'A', 'B', ..., 'X', 'Y', 'Z', 'a', 'b'])

/**
 * lowerCaseLetters: Enables lowercase letters (if one of the limit values
 *                   has a lowercase letter, this option is enabled automatically)
 */
pr.create('Z', 'AB', { lowerCaseLetters: true });
//=> ['Z', 'a', 'b', 'c', 'd', 'e', ..., 'x', 'y', 'z', 'AA', 'AB'])

/**
 * chars: Customizes the characters used to build the string range
 */
pr.create('$', '%#', { chars: '$%#' });
//=> ['$', '%', '#', '$$', '$%', '$#', '%$', '%%', '%#']
```

## Author

Alcides Queiroz Aguiar

- Website: [www.alcidesqueiroz.com](https://www.alcidesqueiroz.com)
- Medium: [@alcidesqueiroz](https://medium.com/@alcidesqueiroz)
- Twitter: [alcidesqueiroz](https://twitter.com/alcidesqueiroz)
- Behance [alcidesqueiroz](https://behance.net/alcidesqueiroz)
- Stack Overflow: [http://is.gd/aqanso](http://stackoverflow.com/users/1295666/alcides-queiroz-aguiar)
- E-mail: alcidesqueiroz &lt;at&gt; gmail

## License

This code is free to use under the terms of the [MIT License](LICENSE.md).
