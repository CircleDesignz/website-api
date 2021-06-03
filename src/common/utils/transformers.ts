import { ValueTransformer } from 'typeorm';
import Dinero from 'dinero.js';
import { DEFAULT_CURRENCY } from '../constants/currency';

// TODO: Probably a better way to do this
export const currencyTransformer: ValueTransformer = {
  to: (value: Dinero.Dinero | undefined) =>
    value === undefined ? null : value.getAmount(),
  from: (value: number) =>
    value === null
      ? null
      : Dinero({ amount: value, currency: DEFAULT_CURRENCY }),
};
