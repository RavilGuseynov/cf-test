import tickersStore, {TickersStore} from './tickers-store';

export interface IStores {
  tickersStore: TickersStore;
}

const stores: IStores = {tickersStore};

export default stores;