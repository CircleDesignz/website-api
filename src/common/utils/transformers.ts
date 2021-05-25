import { ValueTransformer } from 'typeorm';
import { DEFAULT_CURRENCY } from '@common/constants/currency';
import Dinero from 'dinero.js';

export const currencyTransformer: ValueTransformer = {
  to: (value: Dinero.Dinero) => value.getAmount(),
  from: (value: number) =>
    Dinero({ amount: value, currency: DEFAULT_CURRENCY }),
};
