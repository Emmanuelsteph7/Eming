import React from "react";
import { Link } from "react-router-dom";
import "./button.scss";

const Button = ({ btnText, btnClass, btnType, btnIcon, btnLink, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }

    return null;
  };
  return (
    <>
      {btnLink ? (
        <Link to={btnLink}>
          <button
            className={`button ${btnClass && `button--${btnClass}`}`}
            type={btnType}
            onClick={handleClick}
          >
            {btnIcon && <span className="button__icon">{btnIcon}</span>}
            <span className="button__text">{btnText}</span>
          </button>
        </Link>
      ) : (
        <>
          <button
            className={`button ${btnClass && `button--${btnClass}`}`}
            type={btnType}
            onClick={handleClick}
          >
            {btnIcon && <span className="button__icon">{btnIcon}</span>}
            <span className="button__text">{btnText}</span>
          </button>
        </>
      )}
    </>
  );
};

export default Button;
