import {makeAutoObservable, runInAction} from "mobx";
import {getTickers} from "../services/client";
import {ITickersData} from "../services/client/interfaces.h";

export class TickersStore {

  private tickersData: ITickersData = {};
  private modalVisible = false;
  private timer: NodeJS.Timeout | null = null;
  private isError = false;
  private fetching = false;

  constructor() {
    makeAutoObservable(this);
  }

  public clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  public async fetchTickers() {
    this.fetching = true;
    try {
      const response = await getTickers();
      runInAction(() => {
        if (response.data.hasOwnProperty('error')) {
          this.isError = true;
        } else {
          this.tickersData = response.data;
          this.isError = false;
        }
      })
    } catch (error) {
      this.isError = true;
      console.error(error);
    } finally {
      runInAction(() => {
        this.fetching = false;
      })
    }
    this.timer = setTimeout(async () => {
      await this.fetchTickers()
    }, 5000)
  }

  public get tickers(): ITickersData {
    return this.tickersData;
  }

  public setModalVisibility(value: boolean) {
    this.modalVisible = value;
  }

  public get modalOpened(): boolean {
    return this.modalVisible;
  }

  public get hasError(): boolean {
    return this.isError;
  }

  public get loading(): boolean {
    return this.fetching && !Object.keys(this.tickersData).length;
  }
}

export default new TickersStore();