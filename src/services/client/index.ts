import axios from 'axios';
import {ITickersDataResponse} from "./interfaces.h";

const BASE_URL = 'https://poloniex.com'

const routes = {
  tickers: 'public?command=returnTicker'
};

export const client = axios.create({
  baseURL: BASE_URL,
});

export const getTickers = (): Promise<ITickersDataResponse> => {
  return client.get(routes.tickers);
}

