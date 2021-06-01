import { ValueTransformer } from 'typeorm';
import { DEFAULT_CURRENCY } from '@common/constants/currency';
import Dinero from 'dinero.js';

// TODO: Probably a better way to do this
export const currencyTransformer: ValueTransformer = {
  to: (value: Dinero.Dinero | undefined) =>
    value === undefined ? null : value.getAmount(),
  from: (value: number) =>
    value === null
      ? null
      : Dinero({ amount: value, currency: DEFAULT_CURRENCY }),
};
