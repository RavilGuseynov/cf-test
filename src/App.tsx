import React, {useContext} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import TickersList from "./components/tickers-list/tickers-list";
import Header from "./components/header";
import {StoresContext} from "./index";
import {observer} from "mobx-react-lite";
import About from "./components/about";

function App() {
  const { tickersStore } = useContext(StoresContext);
  console.log(tickersStore.loading)
  console.log('has tickers', !!Object.keys(tickersStore.tickers).length);
  return (
    <div className="App">
      <Router>

        <Header />
        {tickersStore.hasError && <div className="error">Ошибка</div>}
        <Switch>

          <Route path="/tickers">
            <TickersList />
          </Route>

          <Route path="/">
            <About />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default observer(App);
