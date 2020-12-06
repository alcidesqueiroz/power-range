'use strict';

const whatype = require('whatype');

// Accepted data types for range limit values
const validTypes = ['numeric', 'date', 'string'];

// Possible chars for string ranges
const numbers = '0123456789';
const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerCaseLetters = upperCaseLetters.toLowerCase();

function limitsHaveValidType(from, to) {
  return [from, to].every((val) => validTypes.some((type) => whatype.is(val, type)));
}

function limitsHaveValidValues(from, to, options) {
  const fromType = whatype(from);
  const toType = whatype(to);
  let valid;

  if (whatype.is(from, 'numeric')) {
    // NaN, Infinity and -Infinity are not valid limit values
    valid = fromType === toType && fromType === 'number';
  } else if (toType === 'date') {
    valid = !Number.isNaN(from.getTime()) && !Number.isNaN(to.getTime());
  } else {
    valid = (from + to)
      .split('').every((char) => options.chars.indexOf(char) > -1);
  }

  return valid;
}

function limitsHaveSameType(from, to) {
  if (whatype.is(from, 'numeric')) return whatype.is(to, 'numeric');

  return whatype(from) === whatype(to);
}

function limitsAreInTheRightOrder(from, to, options) {
  const rangeType = whatype(from);

  if (rangeType === 'number' || rangeType === 'date') {
    return to >= from;
  }

  // So, rangeType is 'string'
  if (to.length > from.length) return true;
  if (to.length < from.length) return false;

  const chars = options.chars;
  for (let i = 0; i < from.length; i++) {
    if (chars.indexOf(to[i]) > chars.indexOf(from[i])) return true;
    if (chars.indexOf(to[i]) < chars.indexOf(from[i])) return false;
  }

  return true;
}

function validateLimits(from, to, options) {
  if (!limitsHaveValidType(from, to)) {
    throw new Error('A range limit value must be a number, date or string.');
  }

  if (!limitsHaveSameType(from, to)) {
    throw new Error('Both limit values of a range must have the same type.');
  }

  if (!limitsHaveValidValues(from, to, options)) {
    throw new Error('Invalid limit values.');
  }

  if (!limitsAreInTheRightOrder(from, to, options)) {
    throw new Error('The passed limit values must be in the right order.');
  }
}

function createRangeOfNumbers(from, to, options) {
  const range = [];
  const increment = options.increment || 1;

  for (let i = from; i <= to; i += increment) {
    range.push(i);
  }

  return range;
}

function getPossibleChars(from, to, options) {
  let chars = '';

  if (options.numbers || /\d/.test(from + to)) {
    chars += numbers;
  }

  if (options.upperCaseLetters || /[A-Z]/.test(from + to)) {
    chars += upperCaseLetters;
  }

  if (options.lowerCaseLetters || /[a-z]/.test(from + to)) {
    chars += lowerCaseLetters;
  }

  return chars;
}

function getNextString(value, chars) {
  const lastPossibleChar = chars[chars.length - 1];
  const nextString = value.split('');
  let incrementNext = true;

  for (let i = nextString.length - 1; i >= 0; i--) {
    if (!incrementNext) continue;

    if (nextString[i] !== lastPossibleChar) {
      nextString[i] = chars[chars.indexOf(nextString[i]) + 1];
      incrementNext = false;
      continue;
    }

    nextString[i] = chars[0];
    if (i === 0) {
      nextString.unshift(chars[0]);
    } else {
      incrementNext = true;
    }
  }

  return nextString.join('');
}

function createRangeOfStrings(from, to, options) {
  let nextString = from;
  const range = [nextString];

  while (nextString !== to) {
    nextString = getNextString(nextString, options.chars);
    range.push(nextString);
  }

  return range;
}

function dateAddMonths(date, increment) {
  const value = new Date(date.valueOf());
  let month = date.getMonth();
  let year = date.getFullYear();
  month = (month + increment) % 12;

  if (month < 0) {
    year += (date.getMonth() + increment - month - 12) / 12;
    month += 12;
  } else {
    year += ((date.getMonth() + increment - month) / 12);
  }

  value.setMonth(month);
  value.setYear(year);

  return value;
}

function dateAdd(date, increment, unit) {
  if (unit === 'month') {
    return dateAddMonths(date, increment);
  }

  const factor = {
    second: 1000,
    minute: 60000,
    hour: 3600000,
    day: 86400000,
    week: 604800000
  }[unit];

  if (!factor) {
    throw new Error('Invalid unit. Accepted values: "second", "minute", "hour", "day", "week", "month"');
  }

  const value = date.valueOf() + (factor * increment);

  return new Date(value);
}

function createRangeOfDates(from, to, options) {
  let nextDate = new Date(from.getTime());
  const range = [];
  const increment = options.increment || 1;
  const unit = options.unit || 'day';

  while (nextDate <= to) {
    range.push(nextDate);
    nextDate = dateAdd(nextDate, increment, unit);
  }

  return range;
}



module.exports = {
  create(from, to, options) {
    const rangeType = whatype(from);
    const opts = { ...options };

    if (rangeType === 'string') {
      opts.chars = opts.chars || getPossibleChars(from, to, opts);
    } else if (opts.increment !== undefined
      && (!Number.isFinite(opts.increment) || opts.increment <= 0)) {
      throw new Error('The increment value must be a number greater than zero.');
    }

    validateLimits(from, to, opts);

    const rangeBuilder = {
      number: createRangeOfNumbers,
      string: createRangeOfStrings,
      date: createRangeOfDates
    }[rangeType];

    return rangeBuilder(from, to, opts);
  }
};
