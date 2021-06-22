import React from "react";
import "./modal.scss";

const Modal = ({ modalBody, modalState }) => {
  return <div className={`modal ${modalState && "show"}`}>{modalBody}</div>;
};

export default Modal;
