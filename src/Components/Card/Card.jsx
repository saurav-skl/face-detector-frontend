import React from "react";
import Tilt from "react-tilt";
import "./Card.css";
import logo from './logo.png'

const Card = () => {
  return (
    <div className="container ">
      <Tilt
        className="Tilt card shadow-1 bg-light-yellow"
        options={{ max: 25 }}
        style={{ height: 200, width: 200 }}
      >
        <div className="Tilt-inner"> <img src={logo} alt="logo"/> </div>
      </Tilt>
    </div>
  );
};

export default Card;
