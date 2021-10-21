import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import stores, {IStores} from "./stores";

export const StoresContext = React.createContext<IStores>(stores);

ReactDOM.render(
  <React.StrictMode>
    <StoresContext.Provider value={stores}>
      <App />
    </StoresContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
