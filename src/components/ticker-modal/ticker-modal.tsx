import React, {useContext, useEffect} from "react";
import ReactDOM from "react-dom";
import './index.css';
import {ITickerItemProps} from "../ticker-item/ticker-item";
import {observer} from "mobx-react-lite";
import {StoresContext} from "../../index";

const modalRoot: HTMLElement | null = document.getElementById('modal-root');

interface ITickerModalProps extends ITickerItemProps {
  closeModal: () => void;
}

const TickerModal: React.FC<ITickerModalProps> = ({tickerName, ticker, closeModal}) => {

  const el = document.createElement('div');
  const { tickersStore } = useContext(StoresContext);

  useEffect(() => {
    modalRoot?.appendChild(el);
    document.body.style.overflow = 'hidden';
    tickersStore.clearTimer();
    return () => {
      modalRoot?.removeChild(el);
      document.body.style.overflow = '';
      tickersStore.fetchTickers();
    }
  }, [el, tickersStore])

  const renderTickerInfo = () => (
    <div className="ticker-info">
      <h2>{tickerName}</h2>
      <div>
        <span>id: </span><span>{ticker.id}</span>
      </div>
      <div>
        <span>last: </span><span>{ticker.last}</span>
      </div>
      <div>
        <span>highestBid: </span><span>{ticker.highestBid}</span>
      </div>
      <div>
        <span>high24hr: </span><span>{ticker.high24hr}</span>
      </div>
      <div>
        <span>percentChange: </span><span>{ticker.percentChange}</span>
      </div>
      <div>
        <span>baseVolume: </span><span>{ticker.baseVolume}</span>
      </div>
      <div>
        <span>isFrozen: </span><span>{ticker.isFrozen}</span>
      </div>
      <div>
        <span>low24hr: </span><span>{ticker.low24hr}</span>
      </div>
      <div>
        <span>lowestAsk: </span><span>{ticker.lowestAsk}</span>
      </div>
      <div>
        <span>postOnly: </span><span>{ticker.postOnly}</span>
      </div>
      <div>
        <span>quoteVolume: </span><span>{ticker.quoteVolume}</span>
      </div>

      <button className="close-modal-btn" onClick={closeModal}>Закрыть</button>
    </div>
  )

  return (
    modalRoot && ReactDOM.createPortal(<div className="modal">{renderTickerInfo()}</div>, modalRoot)
  )
}

export default observer(TickerModal);