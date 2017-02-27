const tap = require('tap');
const pr = require('./index');

/**
 * Ranges of numbers
 */
tap.deepEqual(pr.create(1, 5), [1, 2, 3, 4, 5]);
tap.deepEqual(pr.create(100, 100), [100]);
tap.deepEqual(pr.create(99999, 100000), [99999, 100000]);
tap.deepEqual(pr.create(-3, 3), [-3, -2, -1, 0, 1, 2, 3]);
tap.deepEqual(pr.create(-7, -2), [-7, -6, -5, -4, -3, -2]);
tap.deepEqual(pr.create(0, 3), [0, 1, 2, 3]);

/**
 * Ranges of strings
 */
const numbers = '0123456789'.split('');
const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'.split('');

tap.deepEqual(pr.create('A', 'G'), ['A', 'B', 'C', 'D', 'E', 'F', 'G']);
tap.deepEqual(pr.create('X', 'd'), ['X', 'Y', 'Z', 'a', 'b', 'c', 'd']);
tap.deepEqual(pr.create('DA', 'DD'), ['DA', 'DB', 'DC', 'DD']);
tap.deepEqual(pr.create('AZ', 'BA'), ['AZ', 'BA']);
tap.deepEqual(pr.create('6', 'B'), ['6', '7', '8', '9', 'A', 'B']);
tap.deepEqual(pr.create('6', 'b'), ['6', '7', '8', '9', 'a', 'b']);
tap.deepEqual(pr.create('z', 'ab'), ['z', 'aa', 'ab']);
tap.deepEqual(pr.create('ZY', 'AAB'), ['ZY', 'ZZ', 'AAA', 'AAB']);
tap.deepEqual(pr.create('98', '002'), ['98', '99', '000', '001', '002']);

// Options
tap.deepEqual(pr.create('AZ', 'BA', { numbers: true }),
  ['AZ', 'B0', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'BA']);
tap.deepEqual(pr.create('6', 'b', { upperCaseLetters: true }),
  ['6', '7', '8', '9'].concat(upperCaseLetters, ['a', 'b']));
tap.deepEqual(pr.create('Z', 'AB', { lowerCaseLetters: true }),
  ['Z'].concat(lowerCaseLetters, ['AA', 'AB']));
tap.deepEqual(pr.create('$', '%#', { chars: '$%#' }),
  ['$', '%', '#', '$$', '$%', '$#', '%$', '%%', '%#']);


/**
 * Ranges of dates
 */
tap.deepEqual(pr.create(new Date(2001, 2, 27, 4, 5, 6), new Date(2001, 3, 5, 6, 7, 8)),
  [
    new Date(2001, 2, 27, 4, 5, 6),
    new Date(2001, 2, 28, 4, 5, 6),
    new Date(2001, 2, 29, 4, 5, 6),
    new Date(2001, 2, 30, 4, 5, 6),
    new Date(2001, 2, 31, 4, 5, 6),
    new Date(2001, 3, 1, 4, 5, 6),
    new Date(2001, 3, 2, 4, 5, 6),
    new Date(2001, 3, 3, 4, 5, 6),
    new Date(2001, 3, 4, 4, 5, 6),
    new Date(2001, 3, 5, 4, 5, 6)
  ]);

tap.deepEqual(pr.create(new Date(2001, 2, 3, 4, 5, 6), new Date(2001, 2, 3, 4, 5, 6)),
  [new Date(2001, 2, 3, 4, 5, 6)]);

// Options
tap.deepEqual(pr.create(new Date(2001, 2, 3, 4, 5, 6), new Date(2001, 2, 3, 4, 5, 12), { unit: 'second' }),
  [
    new Date(2001, 2, 3, 4, 5, 6),
    new Date(2001, 2, 3, 4, 5, 7),
    new Date(2001, 2, 3, 4, 5, 8),
    new Date(2001, 2, 3, 4, 5, 9),
    new Date(2001, 2, 3, 4, 5, 10),
    new Date(2001, 2, 3, 4, 5, 11),
    new Date(2001, 2, 3, 4, 5, 12)
  ]);

tap.deepEqual(pr.create(new Date(2001, 2, 3, 4, 55, 6), new Date(2001, 2, 3, 5, 2, 6), { unit: 'minute' }),
  [
    new Date(2001, 2, 3, 4, 55, 6),
    new Date(2001, 2, 3, 4, 56, 6),
    new Date(2001, 2, 3, 4, 57, 6),
    new Date(2001, 2, 3, 4, 58, 6),
    new Date(2001, 2, 3, 4, 59, 6),
    new Date(2001, 2, 3, 5, 0, 6),
    new Date(2001, 2, 3, 5, 1, 6),
    new Date(2001, 2, 3, 5, 2, 6)
  ]);

tap.deepEqual(pr.create(new Date(2001, 2, 3, 17, 5, 6), new Date(2001, 2, 4, 1, 5, 6), { unit: 'hour' }),
  [
    new Date(2001, 2, 3, 17, 5, 6),
    new Date(2001, 2, 3, 18, 5, 6),
    new Date(2001, 2, 3, 19, 5, 6),
    new Date(2001, 2, 3, 20, 5, 6),
    new Date(2001, 2, 3, 21, 5, 6),
    new Date(2001, 2, 3, 22, 5, 6),
    new Date(2001, 2, 3, 23, 5, 6),
    new Date(2001, 2, 4, 0, 5, 6),
    new Date(2001, 2, 4, 1, 5, 6)
  ]);

tap.deepEqual(pr.create(new Date(2001, 2, 27, 4, 5, 6), new Date(2001, 3, 5, 6, 7, 8), { unit: 'day' }),
  [
    new Date(2001, 2, 27, 4, 5, 6),
    new Date(2001, 2, 28, 4, 5, 6),
    new Date(2001, 2, 29, 4, 5, 6),
    new Date(2001, 2, 30, 4, 5, 6),
    new Date(2001, 2, 31, 4, 5, 6),
    new Date(2001, 3, 1, 4, 5, 6),
    new Date(2001, 3, 2, 4, 5, 6),
    new Date(2001, 3, 3, 4, 5, 6),
    new Date(2001, 3, 4, 4, 5, 6),
    new Date(2001, 3, 5, 4, 5, 6)
  ]);

tap.deepEqual(pr.create(new Date(2001, 11, 5, 4, 5, 6), new Date(2002, 0, 23, 4, 5, 6), { unit: 'week' }),
  [
    new Date(2001, 11, 5, 4, 5, 6),
    new Date(2001, 11, 12, 4, 5, 6),
    new Date(2001, 11, 19, 4, 5, 6),
    new Date(2001, 11, 26, 4, 5, 6),
    new Date(2002, 0, 2, 4, 5, 6),
    new Date(2002, 0, 9, 4, 5, 6),
    new Date(2002, 0, 16, 4, 5, 6),
    new Date(2002, 0, 23, 4, 5, 6)
  ]);

tap.deepEqual(pr.create(new Date(2003, 2, 3, 4, 5, 6), new Date(2004, 3, 3, 4, 5, 6), { unit: 'month' }),
  [
    new Date(2003, 2, 3, 4, 5, 6),
    new Date(2003, 3, 3, 4, 5, 6),
    new Date(2003, 4, 3, 4, 5, 6),
    new Date(2003, 5, 3, 4, 5, 6),
    new Date(2003, 6, 3, 4, 5, 6),
    new Date(2003, 7, 3, 4, 5, 6),
    new Date(2003, 8, 3, 4, 5, 6),
    new Date(2003, 9, 3, 4, 5, 6),
    new Date(2003, 10, 3, 4, 5, 6),
    new Date(2003, 11, 3, 4, 5, 6),
    new Date(2004, 0, 3, 4, 5, 6),
    new Date(2004, 1, 3, 4, 5, 6),
    new Date(2004, 2, 3, 4, 5, 6),
    new Date(2004, 3, 3, 4, 5, 6)
  ]);

tap.deepEqual(pr.create(new Date(2001, 2, 27, 4, 5, 6), new Date(2001, 3, 5, 6, 7, 8), { unit: 'day', increment: 2 }),
  [
    new Date(2001, 2, 27, 4, 5, 6),
    new Date(2001, 2, 29, 4, 5, 6),
    new Date(2001, 2, 31, 4, 5, 6),
    new Date(2001, 3, 2, 4, 5, 6),
    new Date(2001, 3, 4, 4, 5, 6)
  ]);

tap.deepEqual(pr.create(new Date(2001, 2, 3, 4, 5, 6), new Date(2002, 3, 4, 5, 6, 7), { unit: 'month', increment: 2 }),
  [
    new Date(2001, 2, 3, 4, 5, 6),
    new Date(2001, 4, 3, 4, 5, 6),
    new Date(2001, 6, 3, 4, 5, 6),
    new Date(2001, 8, 3, 4, 5, 6),
    new Date(2001, 10, 3, 4, 5, 6),
    new Date(2002, 0, 3, 4, 5, 6),
    new Date(2002, 2, 3, 4, 5, 6)
  ]);

tap.deepEqual(pr.create(new Date(2001, 2, 27, 4, 5, 6), new Date(2001, 3, 5, 6, 7, 8), { increment: 2 }),
  [
    new Date(2001, 2, 27, 4, 5, 6),
    new Date(2001, 2, 29, 4, 5, 6),
    new Date(2001, 2, 31, 4, 5, 6),
    new Date(2001, 3, 2, 4, 5, 6),
    new Date(2001, 3, 4, 4, 5, 6)
  ]);


/**
 * Errors
 */

// Accepted types checking
tap.throws(() => pr.create(true, 2),
  new Error('A range limit value must be a number, date or string.'));
tap.throws(() => pr.create({}, new Date(2001, 3, 3)),
  new Error('A range limit value must be a number, date or string.'));
tap.throws(() => pr.create('whatever', []),
  new Error('A range limit value must be a number, date or string.'));
tap.throws(() => pr.create(null, 3),
  new Error('A range limit value must be a number, date or string.'));
tap.throws(() => pr.create(1, undefined),
  new Error('A range limit value must be a number, date or string.'));

 // Invalid limit values
tap.throws(() => pr.create(1, Infinity),
  new Error('Invalid limit values.'));
tap.throws(() => pr.create(NaN, 3),
  new Error('Invalid limit values.'));
tap.throws(() => pr.create(new Date(999999, 999999, 999999), new Date(2001, 1, 1)),
  new Error('Invalid limit values.'));
tap.throws(() => pr.create('abc', '_#@'),
  new Error('Invalid limit values.'));

// Limits same type checking
tap.throws(() => pr.create(1, new Date()),
  new Error('Both limit values of a range must have the same type.'));
tap.throws(() => pr.create('a', 1),
  new Error('Both limit values of a range must have the same type.'));
tap.throws(() => pr.create('a', new Date()),
  new Error('Both limit values of a range must have the same type.'));
tap.throws(() => pr.create('1', 2),
  new Error('Both limit values of a range must have the same type.'));

// Limits order checking
tap.throws(() => pr.create(3, 2),
  new Error('The passed limit values must be in the right order.'));
tap.throws(() => pr.create(new Date(2001, 3, 4), new Date(2001, 3, 3)),
  new Error('The passed limit values must be in the right order.'));
tap.throws(() => pr.create('C', '2'),
  new Error('The passed limit values must be in the right order.'));

// Date range unit validation
tap.throws(() => pr.create(new Date(2001, 3, 2), new Date(2001, 3, 3), { unit: 'decade' }),
  new Error('Invalid unit. Accepted values: "second", "minute", "hour", "day", "week", "month"'));

// Increment value validation
tap.throws(() => pr.create(new Date(2001, 3, 2), new Date(2001, 3, 3), { increment: -3 }),
  new Error('The increment value must be a number greater than zero.'));
tap.throws(() => pr.create(new Date(2001, 3, 2), new Date(2001, 3, 3), { increment: 0 }),
  new Error('The increment value must be a number greater than zero.'));
tap.throws(() => pr.create(1, 10, { increment: NaN }),
  new Error('The increment value must be a number greater than zero.'));
tap.throws(() => pr.create(1, 10, { increment: Infinity }),
  new Error('The increment value must be a number greater than zero.'));
tap.throws(() => pr.create(1, 10, { increment: -Infinity }),
  new Error('The increment value must be a number greater than zero.'));
