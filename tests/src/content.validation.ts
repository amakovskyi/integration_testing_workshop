import { validate } from 'uuid';
import { isDeepStrictEqual } from 'util';

class Expectation {
  constructor(readonly name: string, readonly matcher: (value: any) => any) {
  }
}

/**
 * Any NOT NULL and NOT UNDEFINED
 */
export function anyValue() {
  return new Expectation('anyValue', value => {
    if (value == null) {
      return '[expected some not null value]';
    }
    return value;
  });
}

/**
 * Any value or NULL
 */
export function anyDefined() {
  return new Expectation('anyDefined', value => {
    if (typeof value == 'undefined') {
      return '[expected some defined value]';
    }
    return value;
  });
}

/**
 * Any not empty string
 */
export function anyString(canBeEmpty: boolean = false, canBeNull: boolean = false) {
  return new Expectation('anyString', value => {
    if (canBeNull && value === null) {
      return value;
    }
    if (typeof value != 'string') {
      return '[string value expected]';
    }
    if (!canBeEmpty && value.length == 0) {
      return '[not empty string expected]';
    }
    return value;
  });
}

/**
 * Any integer (not NaN)
 */
export function anyInteger() {
  return new Expectation('anyInteger', value => {
    if (typeof value !== 'number' || !isFinite(value)) {
      return '[integer number value expected]';
    }
    if (!Number.isInteger(value)) {
      return '[integer number value expected]';
    }
    return value;
  });
}

/**
 * Any number (not NaN)
 */
export function anyNumber(canBeNull: boolean = false) {
  return new Expectation('anyInteger', value => {
    if (canBeNull && typeof value != 'undefined' && value == null) {
      return value;
    }
    if (typeof value !== 'number' || !isFinite(value)) {
      return '[number value expected]';
    }
    return value;
  });
}

/**
 * Any boolean
 */
export function anyBoolean(canBeNull: boolean = false) {
  return new Expectation('anyBoolean', value => {
    if (canBeNull && typeof value != 'undefined' && value == null) {
      return value;
    }
    if (typeof value !== 'boolean') {
      return '[boolean value expected]';
    }

    return value;
  });
}

/**
 * Any DATE
 */
export function anyDate(canBeNull: boolean = false) {
  return new Expectation('anyDate', value => {
    if (canBeNull && typeof value != 'undefined' && value == null) {
      return value;
    }
    if (value instanceof Date) {
      return value;
    }
    if (typeof value != 'string') {
      return '[date value expected]';
    }
    let date = Date.parse(value);
    if (!Number.isInteger(date)) {
      return '[date value expected]';
    }
    return value;
  });
}

/**
 * Any UUID
 */
export function anyUuid(canBeNull: boolean = false) {
  return new Expectation('anyUuid', value => {
    if (canBeNull && value === null) {
      return value;
    }
    if (typeof value != 'string') {
      return '[UUID value expected]';
    }
    if (!validate(value)) {
      return '[UUID value expected]';
    }
    return value;
  });
}

/**
 * Any file url
 * @param filename
 * @param canBeNull
 */
export function fileUrl(filename: string | null = null, canBeNull: boolean = false) {
  return new Expectation('fileUrl', value => {
    if (canBeNull && typeof value != 'undefined' && value == null) {
      return value;
    }
    if (typeof value != 'string') {
      return '[URL string expected]';
    }
    if (!value.startsWith('http://') && !value.startsWith('https://')) {
      return '[URL string expected]';
    }
    if (filename != null) {
      if (!value.endsWith(filename)) {
        return '[expected to end with "' + filename + '"]';
      }
    }
    return value;
  });
}

/**
 * Expect that value is NOT PRESENT
 */
export function valueAbsent() {
  return new Expectation('undefined', value => {
    if (typeof value != 'undefined') {
      return '[expected not present]';
    }
    return value;
  });
}

/**
 * Any JsonObject
 */
export function anyObject(canBeNull: boolean = false, expected: any = null) {
  return new Expectation('anyObject', value => {
    if (typeof value != 'undefined' && value == null && canBeNull) {
      return null;
    }
    if (!isObject(value)) {
      return '[expected JsonObject]';
    }
    if (expected != null) {
      return copyWithExpectedMatch(value, expected);
    }
    return value;
  });
}

/**
 * Any JsonArray
 */
export function anyArray(expectedLength: number | null = null) {
  return new Expectation('anyArray', value => {
    if (!isArray(value)) {
      return '[expected JsonArray]';
    }
    if (expectedLength != null && value.length != expectedLength) {
      return '[expected JsonArray with length ' + expectedLength + ']';
    }
    return value;
  });
}

export function arrayWithAllItemsMatch(match: any) {
  return new Expectation('arrayWithAllItemsMatch', value => {
    if (!isArray(value)) {
      return '[expected JsonArray]';
    }
    let expected: any[] = [];
    for (let i = 0; i < value.length; i++) {
      let expectedMatch = copyWithExpectedMatch(value[i], match);
      expected.push(expectedMatch);
    }
    return expected;
  });
}

export function arrayContainingOnly(...args: any) {
  return matchAll(
    anyArray(args.length),
    anyArrayContaining(...args),
  );
}

export function anyArrayContaining(...args: any) {
  return new Expectation('anyArrayContaining', value => {
    if (!isArray(value)) {
      return '[expected JsonArray]';
    }
    let argsMatched: any[] = [];
    let argsNotMatched: any[] = [];
    for (let expectedItem of args) {
      let isMatched = false;
      for (let actualItem of value) {
        let expectedMatch = copyWithExpectedMatch(actualItem, expectedItem);
        if (isDeepStrictEqual(expectedMatch, actualItem)) {
          isMatched = true;
        }
      }
      if (isMatched) {
        argsMatched.push(expectedItem);
      } else {
        argsNotMatched.push(expectedItem);
      }
    }
    if (argsNotMatched.length > 0) {
      return {
        error: 'Not all expected items found in array',
        actual: value,
        expectedAndMatched: argsMatched,
        notMatchedButExpected: argsNotMatched,
      };
    }
    return value;
  });
}

export function anyArrayContainingSome(...args: any) {
  return new Expectation('anyArrayContainingSome', value => {
    if (!isArray(value)) {
      return '[expected JsonArray]';
    }
    let argsMatched: any[] = [];
    let argsNotMatched: any[] = [];
    for (let expectedItem of args) {
      let isMatched = false;
      for (let actualItem of value) {
        let expectedMatch = copyWithExpectedMatch(actualItem, expectedItem);
        if (isDeepStrictEqual(expectedMatch, actualItem)) {
          isMatched = true;
        }
      }
      if (isMatched) {
        argsMatched.push(expectedItem);
      } else {
        argsNotMatched.push(expectedItem);
      }
    }

    if (!argsMatched.length) {
      return {
        error: 'No matches found in array with expected items',
        actual: value,
        expectedAndMatched: argsMatched,
        notMatchedButExpected: argsNotMatched,
      };
    }
    return value;
  });
}

export function anyArrayNotContaining(...args: any) {
  return new Expectation('anyArrayNotContaining', value => {
    if (!isArray(value)) {
      return '[expected JsonArray]';
    }
    let argsMatched: any[] = [];
    let argsNotMatched: any[] = [];
    for (let expectedItem of args) {
      let isMatched = false;
      for (let actualItem of value) {
        let expectedMatch = copyWithExpectedMatch(actualItem, expectedItem);
        if (isDeepStrictEqual(expectedMatch, actualItem)) {
          isMatched = true;
        }
      }
      if (isMatched) {
        argsMatched.push(expectedItem);
      } else {
        argsNotMatched.push(expectedItem);
      }
    }
    if (argsMatched.length > 0) {
      return {
        error: 'Some of not expected items found in the array',
        actual: value,
        expectedAndMatched: argsNotMatched,
        notMatchedButExpected: argsMatched,
      };
    }
    return value;
  });
}

export function matchAll(...matchesArray: any) {
  return new Expectation('matchAll', value => {
    for (let match of matchesArray) {
      if (match instanceof Expectation) {
        let expectationResponse = match.matcher(value);
        if (!isDeepStrictEqual(value, expectationResponse)) {
          return expectationResponse;
        }
      } else {
        let result = copyWithExpectedMatch(value, match);
        if (!isDeepStrictEqual(value, result)) {
          return result;
        }
      }
    }
    return value;
  });
}

export function matchAny(...matchesArray: any) {
  return new Expectation('matchAny', value => {
    for (let match of matchesArray) {
      if (match instanceof Expectation) {
        let expectationResponse = match.matcher(value);
        if (isDeepStrictEqual(value, expectationResponse)) {
          return value;
        }
      } else {
        let result = copyWithExpectedMatch(value, match);
        if (isDeepStrictEqual(value, result)) {
          return value;
        }
      }
    }
    return {
      error: 'No matches found in array with expected items',
      expected: matchesArray,
    };
  });
}

export function equalsTo(other: any) {
  return new Expectation('equalsTo', value => {
    return other;
  });
}

/**
 * In comparison with strict equation this method validates that [data] contain all information as specified in [expected],
 * but [data] itself CAN contain other information which is not noticed in [expected] and that information will not cause
 * fail.
 */
export function validateContent(data: any, expected: any) {
  let dataAsExpected = copyWithExpectedMatch(data, expected);
  expect(data).toEqual(dataAsExpected);
}

function isArray(value: any): boolean {
  return Array.isArray(value);
}

function isObject(value: any): boolean {
  return !(value instanceof Expectation) && Object(value) === value && !Array.isArray(value);
}

/**
 * Create a copy of [actual] but override all keys/values present in [expected]
 * @param actual
 * @param expected
 */
function copyWithExpectedMatch(actual: any, expected: any): any {
  if (isArray(actual) && isArray(expected)) {
    // making copy with size of EXPECTED
    let result = [];
    for (let i = 0; i < expected.length; i++) {
      let actualItem = actual[i];
      let expectedItem = expected[i];
      result.push(copyWithExpectedMatch(actualItem, expectedItem));
    }
    return result;
  } else if (isObject(actual) && isObject(expected)) {
    let result = Object.assign({}, actual);
    Object.keys(expected).forEach(key => {
      const expectedValue = copyWithExpectedMatch(actual[key], expected[key]);
      if (typeof expectedValue != 'undefined') {
        result[key] = expectedValue;
      } else {
        delete result[key];
      }
    });
    return result;
  } else if (expected instanceof Expectation) {
    return expected.matcher(actual);
  } else {
    if (expected instanceof Date) {
      return expected.toISOString();
    }
    return expected;
  }
}

export function validateUnique(array: any[]) {
  let nonUniqueItems = new Set<any>();
  array.forEach((item, index) => {
    if (index != array.indexOf(item)) {
      nonUniqueItems.add(item);
    }
  });
  if (nonUniqueItems.size > 0) {
    let data = {
      allItems: array,
      duplicatedItems: [...nonUniqueItems],
    };
    throw new Error(`Items is not unique: ` + JSON.stringify(data, null, 2));
  }
}
