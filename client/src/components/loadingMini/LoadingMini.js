import React from "react";
import "./loadingMini.scss";

const LoadingMini = () => {
  return (
    <div className="loadingMini">
      {/* <div className="loadingMini__bg"></div> */}
      <div className="loadingMini__body">
        <div className="loadingMini__ball"></div>
        <div className="loadingMini__ball"></div>
        <div className="loadingMini__ball"></div>
      </div>
    </div>
  );
};

export default LoadingMini;
