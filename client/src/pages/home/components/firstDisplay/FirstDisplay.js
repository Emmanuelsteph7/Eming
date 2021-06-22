import React, { useRef } from "react";
import "./firstDisplay.scss";
import { ReactComponent as Curve1 } from "../../../../assets/svgs/curve.svg";
import { ReactComponent as Curve2 } from "../../../../assets/svgs/curve2.svg";
import { MdCameraRoll } from "react-icons/md";
import { useEffect } from "react";

const FirstDisplay = () => {
  const displayRef = useRef("");

  useEffect(() => {
    let timer = setTimeout(() => {
      displayRef.current.classList.add("hide");
    }, 8000);

    return () => {
      clearTimeout(timer);
    };
  });
  return (
    <div ref={displayRef} className="firstDisplay">
      <div className="firstDisplay__container">
        <Curve1 className="firstDisplay__curve1" />
        <Curve2 className="firstDisplay__curve2" />
        <div className="firstDisplay__icon">
          <MdCameraRoll />
        </div>
        <h1 className="firstDisplay__text">Eming</h1>
        <div className="firstDisplay__closingBg"></div>
      </div>
    </div>
  );
};

export default FirstDisplay;
