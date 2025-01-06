import {NumberValue, RangeValue} from './types';

export function isRangeValue(value: NumberValue): value is RangeValue {
  if (typeof value === 'number') return false;

  return 'min' in value && 'max' in value;
}
