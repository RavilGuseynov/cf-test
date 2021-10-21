import React from "react";
import {Link} from "react-router-dom";
import './header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <Link className="header-link" to="/tickers">Котировки</Link>
      <Link className="header-link" to="/">О приложении</Link>
    </header>
  )
}

export default Header;