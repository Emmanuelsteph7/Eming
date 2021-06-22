import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import { myContext } from "../../store/Context";
import "./header.scss";

const Header = ({ navBarFunc }) => {
  const store = useContext(myContext);
  const { userData } = store;
  const { data } = userData;
  const [scrollY, setScrollY] = useState(false);

  useEffect(() => {
    let scrollFunc = () => {
      if (window.scrollY > 30) {
        setScrollY(true);
      } else {
        setScrollY(false);
      }
    };
    window.addEventListener("scroll", scrollFunc);

    return () => window.removeEventListener("scroll", scrollFunc);
  }, []);
  return (
    <header className={`header ${scrollY && "scroll"}`}>
      <div className="header__container">
        <div className="header__toggler" onClick={navBarFunc}>
          <FaBars />
        </div>
        <div className="header__brand">
          <span>Eming</span>
        </div>
        <div className="header__notifications">
          {data.image ? (
            <img src={data.image ? data.image : ""} alt="" />
          ) : (
            <IoPersonCircle />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
