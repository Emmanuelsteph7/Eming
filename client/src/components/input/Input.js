import React from "react";
import "./input.scss";

const Input = ({
  labelText,
  inputType,
  inputValue,
  inputPlaceholder,
  inputName,
  inputId,
  onChange,
  optionsArray,
}) => {
  const handleChange = (e) => {
    if (onChange) {
      return onChange(e);
    }

    return null;
  };

  let mappedOptions;

  if (optionsArray) {
    mappedOptions = optionsArray.map((option) => {
      return (
        <option key={option.id} value={option.value}>
          {option.value}
        </option>
      );
    });
  }

  return (
    <>
      {inputType === "textArea" ? (
        <div className="formGroup textArea">
          <label className="formGroup__label" htmlFor="">
            {labelText}
          </label>
          <textarea
            name={inputName}
            id={inputId}
            className="formGroup__textArea"
            onChange={handleChange}
            value={inputValue}
            placeholder={inputPlaceholder}
            cols="30"
            rows="6"
          ></textarea>
        </div>
      ) : inputType === "dropdown" ? (
        <div className="formGroup textArea">
          <label className="formGroup__label" htmlFor="status">
            Status
          </label>
          <select
            onChange={onChange}
            value={inputValue}
            name="status"
            id="status"
            className="formGroup__select"
          >
            {mappedOptions}
          </select>
        </div>
      ) : (
        <div className="formGroup">
          <label className="formGroup__label" htmlFor="">
            {labelText}
          </label>
          <input
            className="formGroup__input"
            type={inputType}
            onChange={handleChange}
            value={inputValue}
            placeholder={inputPlaceholder}
            name={inputName}
          />
        </div>
      )}
    </>
  );
};

export default Input;
