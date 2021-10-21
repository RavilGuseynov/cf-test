import React, {Fragment, useContext, useState} from "react";
import {ITickerItem} from "../../services/client/interfaces.h";
import './ticker-item.css';
import TickerModal from "../ticker-modal";
import {observer} from "mobx-react-lite";
import {StoresContext} from "../../index";

export interface ITickerItemProps {
  ticker: ITickerItem;
  tickerName: string;
}

const TickerItem: React.FC<ITickerItemProps> = ({ticker, tickerName}) => {

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { tickersStore } = useContext(StoresContext);

  const showModal = () => {
    if (!tickersStore.modalOpened) {
      setModalVisible(true);
      tickersStore.setModalVisibility(true);
    }
  }

  const closeModal = () => {
    setModalVisible(false);
    tickersStore.setModalVisibility(false);
  }

  const getRowClassName = () => tickersStore.modalOpened ? 'table-row' : 'table-row table-row-body';

  return (
    <Fragment>
      <tr onClick={showModal} className={getRowClassName()}>
        <td>{tickerName}</td>
        <td>{ticker.last}</td>
        <td>{ticker.highestBid}</td>
        <td>{ticker.highestBid}</td>
        <td>{ticker.percentChange}</td>
      </tr>
      {modalVisible && <TickerModal ticker={ticker} tickerName={tickerName} closeModal={closeModal} />}
    </Fragment>
  )
}

export default observer(TickerItem);