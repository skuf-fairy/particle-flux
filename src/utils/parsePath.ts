import {PathFunction} from '../core/path/path.types';

/**
 * A hand picked list of Math functions (and a couple properties) that are
 * allowable. They should be used without the preceding "Math."
 * @hidden
 */
const MATH_FUNCS = [
  'E',
  'LN2',
  'LN10',
  'LOG2E',
  'LOG10E',
  'PI',
  'SQRT1_2',
  'SQRT2',
  'abs',
  'acos',
  'acosh',
  'asin',
  'asinh',
  'atan',
  'atanh',
  'atan2',
  'cbrt',
  'ceil',
  'cos',
  'cosh',
  'exp',
  'expm1',
  'floor',
  'fround',
  'hypot',
  'log',
  'log1p',
  'log10',
  'log2',
  'max',
  'min',
  'pow',
  'random',
  'round',
  'sign',
  'sin',
  'sinh',
  'sqrt',
  'tan',
  'tanh',
];
/**
 * create an actual regular expression object from the string
 * @hidden
 */
const WHITELIST = new RegExp(
  [
    // Allow the 4 basic operations, parentheses and all numbers/decimals, as well
    // as 'x', for the variable usage.
    '[01234567890\\.\\*\\-\\+\\/\\(\\)x ,]',
  ]
    .concat(MATH_FUNCS)
    .join('|'),
  'g',
);

export function parsePath(pathString: string): PathFunction {
  const matches = pathString.match(WHITELIST);

  if (matches === null) {
    throw new Error('Path string is not valid function');
  }

  for (let i = matches.length - 1; i >= 0; --i) {
    if (MATH_FUNCS.indexOf(matches[i]) >= 0) {
      matches[i] = `Math.${matches[i]}`;
    }
  }
  pathString = matches.join('');

  // eslint-disable-next-line no-new-func
  return new Function('x', `return ${pathString};`) as (x: number) => number;
}
