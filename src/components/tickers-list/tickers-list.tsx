import React, {Fragment, useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {StoresContext} from "../../index";
import TickerItem from "../ticker-item";
import "./index.css"
import Loader from "../loader";

const TickersList: React.FC = () => {

  const { tickersStore } = useContext(StoresContext);
  const { hasError, loading } = tickersStore;

  useEffect(() => {
    tickersStore.fetchTickers();
    return () => {
      tickersStore.clearTimer();
    }
  }, [tickersStore])

  const renderTickersList = () => {
    const { tickers } = tickersStore;
    return (
      Object.keys(tickers).map((tickerName) => (
        <Fragment key={tickers[tickerName].id}>
          <TickerItem ticker={tickers[tickerName]} tickerName={tickerName} />
        </Fragment>
      ))
    )
  }

  return (
    <Fragment>
      {!hasError &&
        loading
        ? <Loader />
        : <table className="table">
          <thead>
            <tr className="table-row">
              <th>Ticker name</th>
              <th>last</th>
              <th>highestBid</th>
              <th>highestBid</th>
              <th>percentChange</th>
            </tr>
          </thead>
          <tbody>
            {renderTickersList()}
          </tbody>
        </table>
      }
    </Fragment>
  )
}

export default observer(TickersList);