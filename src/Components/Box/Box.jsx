import React from "react";
import "./Box.css";

const Box = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div className="container ">
      <p className="f3 tc white">{"Hello Saurav, All work done here..."}</p>
      <div className=" pattern tc">
        <div className=" pa4 w-100">
          <input
            type="text"
            className="w-70 dim ph3 pv2 mb2 dib white bg-dark-gray"
            onChange={onInputChange}
          ></input>
          <button
            className="f6 link dim ph3 pv2 mb2 dib white bg-dark-gray ml2"
            onClick={onButtonSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default Box;
