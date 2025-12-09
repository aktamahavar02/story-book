import React, { useEffect } from "react";
import { CountrySelect } from "react-country-state-city";

function CountryDropdown({
  values,
  onChange,
  onBlur,
  errors,
  touched,
  name,
  placeHolder,
}) {
  // useEffect(() => {
  //   const dropdown = document.querySelector(".stdropdown-container");

  //   if (dropdown) {
  //     if (errors && touched) {
  //       dropdown.classList.add("border-red-500"); // add red border
  //       dropdown.classList.remove("border-gray-300", "focus:border-purple-400");
  //     } else {
  //       dropdown.classList.remove("border-red-500");
  //       dropdown.classList.add("border-gray-300"); // fallback normal border
  //     }
  //   }
  // }, [errors, touched]);

  useEffect(() => {
    const dropdown = document.querySelector(".stdropdown-container");
    if (!dropdown) return;

    if (errors && touched) {
      dropdown.classList.add("border-red-500");
      dropdown.classList.remove("border-gray-300", "focus:border-purple-400");
    } else {
      dropdown.classList.remove("border-red-500");
      dropdown.classList.add("border-gray-300");
    }
  }, [errors, touched, values]);
  return (
    <CountrySelect
      name={name}
      placeHolder={placeHolder}
      value={values}
      autoComplete={"off"}
      onChange={onChange}
      onBlur={onBlur}
      className={"error-border"}
    />
  );
}

export default CountryDropdown;
