(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'type-detect'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, require('type-detect'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, global.typeDetect);
    global.powerRange = mod.exports;
  }
})(this, function (module, typeDetect) {
  'use strict';

  // A wrapper for the typeDetect function
  var type = function type(val) {
    return typeDetect(val).toLowerCase();
  };

  // Accepted data types for range limit values
  var validTypes = ['number', 'date', 'string'];

  // Possible chars for string ranges
  var numbers = '0123456789';
  var upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var lowerCaseLetters = upperCaseLetters.toLowerCase();

  function limitsHaveValidType(from, to) {
    return [from, to].every(function (val) {
      return validTypes.indexOf(type(val)) > -1;
    });
  }

  function limitsHaveValidValues(from, to, options) {
    var rangeType = type(from);
    var valid = void 0;

    if (rangeType === 'number') {
      valid = !isNaN(from) && !isNaN(to) && isFinite(from) && isFinite(to);
    } else if (rangeType === 'date') {
      valid = !isNaN(from.getTime()) && !isNaN(to.getTime());
    } else {
      valid = (from + to).split('').every(function (char) {
        return options.chars.indexOf(char) > -1;
      });
    }

    return valid;
  }

  function limitsHaveSameType(from, to) {
    return type(from) === type(to);
  }

  function limitsAreInTheRightOrder(from, to, options) {
    var rangeType = type(from);

    if (rangeType === 'number' || rangeType === 'date') {
      return to >= from;
    }

    // So, rangeType is 'string'
    if (to.length > from.length) return true;
    if (to.length < from.length) return false;

    var chars = options.chars;
    for (var i = 0; i < from.length; i++) {
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
    var range = [];
    var increment = options.increment || 1;

    for (var i = from; i <= to; i += increment) {
      range.push(i);
    }

    return range;
  }

  function getPossibleChars(from, to, options) {
    var chars = '';

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
    var lastPossibleChar = chars[chars.length - 1];
    var nextString = value.split('');
    var incrementNext = true;

    for (var i = nextString.length - 1; i >= 0; i--) {
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
    var nextString = from;
    var range = [nextString];

    while (nextString !== to) {
      nextString = getNextString(nextString, options.chars);
      range.push(nextString);
    }

    return range;
  }

  function dateAddMonths(date, increment) {
    var value = new Date(date.valueOf());
    var month = date.getMonth();
    var year = date.getFullYear();
    month = (month + increment) % 12;

    if (month < 0) {
      year += (date.getMonth() + increment - month - 12) / 12;
      month += 12;
    } else {
      year += (date.getMonth() + increment - month) / 12;
    }

    value.setMonth(month);
    value.setYear(year);

    return value;
  }

  function dateAdd(date, increment, unit) {
    if (unit === 'month') {
      return dateAddMonths(date, increment);
    }

    var factor = {
      second: 1000,
      minute: 60000,
      hour: 3600000,
      day: 86400000,
      week: 604800000
    }[unit];

    if (!factor) {
      throw new Error('Invalid unit. Accepted values: "second", "minute", "hour", "day", "week", "month"');
    }

    var value = date.valueOf() + factor * increment;

    return new Date(value);
  }

  function createRangeOfDates(from, to, options) {
    var nextDate = new Date(from.getTime());
    var range = [];
    var increment = options.increment || 1;
    var unit = options.unit || 'day';

    while (nextDate <= to) {
      range.push(nextDate);
      nextDate = dateAdd(nextDate, increment, unit);
    }

    return range;
  }

  module.exports = {
    create: function create(from, to, options) {
      var rangeType = type(from);
      var opts = Object.assign({}, options);

      if (rangeType === 'string') {
        opts.chars = opts.chars || getPossibleChars(from, to, opts);
      } else if (opts.increment !== undefined && (!isFinite(opts.increment) || opts.increment <= 0)) {
        throw new Error('The increment value must be a number greater than zero.');
      }

      validateLimits(from, to, opts);

      var rangeBuilder = {
        number: createRangeOfNumbers,
        string: createRangeOfStrings,
        date: createRangeOfDates
      }[rangeType];

      return rangeBuilder(from, to, opts);
    }
  };
});
