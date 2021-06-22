import React, { useContext } from "react";
import "./sideNav.scss";
import { FaTimes } from "react-icons/fa";
import { myContext } from "../../store/Context";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const SideNav = ({ navBarFunc, navBar }) => {
  const { logout } = useContext(myContext);
  const [activeLinks, setActiveLinks] = useState({
    link1: true,
    link2: false,
  });

  const handleNavActive = (num) => {
    if (num === 1) {
      setActiveLinks(() => ({
        link1: true,
        link2: false,
      }));
    }

    if (num === 2) {
      setActiveLinks(() => ({
        link1: false,
        link2: true,
      }));
    }
  };
  // }, []);
  return (
    <div className={`sideNav ${navBar && "show"}`}>
      <div
        className={`sideNav__bg ${navBar && "show"}`}
        onClick={navBarFunc}
      ></div>
      <div className="sideNav__container">
        <div className="sideNav__icon" onClick={navBarFunc}>
          <FaTimes />
        </div>
        <div
          className={`sideNav__link ${activeLinks.link1 && "active"}`}
          onClick={navBarFunc}
        >
          <NavLink onClick={() => handleNavActive(1)} to="/dashboard">
            Dashboard
          </NavLink>
        </div>
        <div
          className={`sideNav__link ${activeLinks.link2 && "active"}`}
          onClick={navBarFunc}
        >
          <NavLink onClick={() => handleNavActive(2)} to="/dashboard/my-posts">
            My Posts
          </NavLink>
        </div>
        <div className="sideNav__link" onClick={logout}>
          Logout
        </div>
      </div>
    </div>
  );
};

export default SideNav;
