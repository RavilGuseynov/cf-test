import React from "react";
import {Link} from "react-router-dom";
import "./about.css";

const About: React.FC = () => {
  return (
    <div className="about-container">
      <h2 className="about-title">
        О приложении
      </h2>
      <div>
        Для просмотра котировок перейдите в раздел <Link to="/tickers">Котировки</Link>
      </div>
    </div>
  )
}

export default About;