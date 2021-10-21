import {makeAutoObservable, runInAction} from "mobx";
import {getTickers} from "../services/client";
import {ITickersData} from "../services/client/interfaces.h";

export class TickersStore {

  private tickersData: ITickersData = {};
  private modalVisible = false;
  private timer: NodeJS.Timeout | null = null;
  private isError= false;

  constructor() {
    makeAutoObservable(this);
  }

  public clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  public async fetchTickers() {
    try {
      const response = await getTickers();
      runInAction(() => {
        this.tickersData = response.data;
        this.isError = false;
      })
    } catch (error) {
      this.isError = true;
      console.error(error);
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
}

export default new TickersStore();