

import React, { useEffect } from "react";
import {  StateSelect } from "react-country-state-city";

function StateSelectDropdown({
  values,
  onChange,
  onBlur,
  errors,
  touched,
  name,
  placeHolder,
  disabled,
  countryid
}) {
  useEffect(() => {
    const dropdown = document.querySelector(".stdropdown-container");

    if (dropdown) {
      if (errors && touched) {
        dropdown.classList.add("border-red-500"); // add red border
        dropdown.classList.remove("border-gray-300", "focus:border-purple-400");
      } else {
        dropdown.classList.remove("border-red-500");
        dropdown.classList.add("border-gray-300"); // fallback normal border
      }
    }
  }, [errors, touched]);
  return (
    <StateSelect
      name={name}
      placeHolder={placeHolder}
      value={values}
      autoComplete={"off"}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      countryid={countryid}
      className={"error-border"}
    />
  );
}

export default StateSelectDropdown;
