import { ICryptoCurrency } from "./cryptocurrency.interface";

export interface ICryptoCurrencyUpdate extends Omit<ICryptoCurrency, 'code'> {}