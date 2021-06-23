import React from "react";
import "./mainDisplay.scss";
import { FaGoogle } from "react-icons/fa";
import { MdCameraRoll } from "react-icons/md";
import Button from "../../../../components/button/Button";

const MainDisplay = () => {
  const googleAuth = () => {
    window.open("https://eming.herokuapp.com/auth/google", "_self");
  };
  return (
    <div className="mainDisplay">
      <div className="mainDisplay__container">
        <div className="mainDisplay__bg"></div>
        <header className="mainDisplay__header">
          <div className="mainDisplay__headerIcon">
            <MdCameraRoll />
          </div>
          <span className="mainDisplay__headerText">Eming</span>
        </header>
        <section className="mainDisplay__body">
          <h1 className="mainDisplay__header1">Document your stories</h1>
          <h2 className="mainDisplay__header2">Capture your memories</h2>
          <h3 className="mainDisplay__header3">
            Save the moment
            <span className="mainDisplay__headerDot">.</span>
            <span className="mainDisplay__headerDot">.</span>
            <span className="mainDisplay__headerDot">.</span>
          </h3>
          <div className="mainDisplay__btn">
            <Button
              btnClass="full"
              btnIcon={<FaGoogle />}
              onClick={googleAuth}
              btnText="Login with Google"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default MainDisplay;
