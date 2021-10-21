import {AxiosResponse} from "axios";

export interface ITickerItem {
  baseVolume: string;
  high24hr: string;
  highestBid: string;
  id: number;
  isFrozen: string;
  last: string;
  low24hr: string;
  lowestAsk: string;
  percentChange: string;
  postOnly: string;
  quoteVolume: string;
}

export interface ITickersData {
  [key: string]: ITickerItem;
}

export interface ITickersDataResponse extends AxiosResponse {
  data: ITickersData;
}