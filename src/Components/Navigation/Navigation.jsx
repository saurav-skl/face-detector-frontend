import React from "react";
import "./Navigation.css";

const Navigation = ({ isSignedIn, onRouteChange }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end",marginRight:'10px' }}>
        <p
          onClick={() => onRouteChange("signin")}
          className="f3 link black underline pointer"
        >
          SignOut
        </p>
      </nav>
    );
  } else {
    return (
      <nav  style={{ display: "flex", justifyContent: "flex-end", marginRight:'10px' }}>
        <p
          onClick={() => onRouteChange("signin")}
          className="f3 link dim black underline pointer"
        >
          SignIn
        </p>
        <p  className="f3 link black underline">|</p>
        <p
          onClick={() => onRouteChange("register")}
          className="f3 link dim black underline pointer"
        >
          Register
        </p>
      </nav>
    );
  }
};

export default Navigation;
