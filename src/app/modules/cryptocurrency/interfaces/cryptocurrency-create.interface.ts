import { ICryptoCurrency } from "./cryptocurrency.interface";

export interface ICryptoCurrencyCreate extends Omit<ICryptoCurrency, 'id'> {}