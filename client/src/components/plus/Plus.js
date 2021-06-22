import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./plus.scss";

const Plus = ({ path }) => {
  return (
    <div className="plus">
      <Link to={path}>
        <FaPlusCircle />
      </Link>
    </div>
  );
};

export default Plus;
