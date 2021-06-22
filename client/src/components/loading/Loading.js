import React from "react";
import "./loading.scss";

const Loading = () => {
  return (
    <div className="loading">
      <div className="loading__bg"></div>
      <div className="loading__body">
        <div className="loading__ball"></div>
        <div className="loading__ball"></div>
        <div className="loading__ball"></div>
      </div>
    </div>
  );
};

export default Loading;
