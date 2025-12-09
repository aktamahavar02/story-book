// src/components/FormField.tsx
import React, { useState } from "react";
import { RiInformationLine } from "react-icons/ri";

interface FormFieldProps {
  name: string;
  value: string | number | boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  label?: string;
  touched?: boolean;
  helpText?: string;
  messages?: string;
  disabled?: boolean;
  isNumber?: boolean;
  isSpace?: boolean;
  tooltipLine?: number;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  type = "text",
  error,
  touched,
  helpText,
  messages,
  disabled = false,
  isSpace = false,
  isNumber = false,
  tooltipLine,

  label,
}) => {
  const showError = !!(error && touched);
  const [tooltip, setTooltip] = useState(false);

  return (
    <div className="relative ">
      {label && (
        <label
          htmlFor={name}
          className=" block font-medium  pb-1 text-neutral-600 text-xs font-figTree "
        >
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={String(value)}
        onChange={(e) => {
       if(isNumber){
        e.target.value = e.target.value
        .replace(/(?!^)\+/g, "") // remove all '+' except the first character
        .replace(/[^0-9+]/g, ""); // allow only digits and '+'
      }
      onChange(e);
        
        }}
        onBlur={onBlur}
        disabled={disabled}
        className={`w-full h-10 font-figTree rounded-lg placeholder:text-xs md:placeholder:text-sm text-sm text-black placeholder-gray-500/50 border border-gray-300 focus:outline-none focus:ring-0 focus:border-purple-500 leading-none pr-8 ${
          isSpace ? "" : "py-2"
        } ${
          isSpace ? "placeholder:text-xs" : ""
        } ${
          showError
            ? "border-red-500 focus:ring-red-400"
            : "focus:ring-purple-400"
        } pl-3`}
      />

      {/* Icon inside input field */}
      <div
        className={`absolute  ${
          isSpace ? "top-8" : "top-[11px]"
        } right-3 flex items-center cursor-pointer`}
        onMouseEnter={() => setTooltip(true)}
        onMouseLeave={() => setTooltip(false)}
      >
        <RiInformationLine
          className={`text-base ${
            showError ? "text-red-500" : "text-gray-400"
          }`}
        />

        {/* Tooltip */}
        {tooltip && (
          <div
            className={`absolute ${
              tooltipLine === 2
                ? "-top-12"
                : tooltipLine === 4
                ? "-top-16"
                : "-top-8"
            } right-0  ${showError ? "bg-red-100" : "bg-gray-100"} ${
              showError ? "text-red-500" : "text-gray-400"
            } text-xs !max-w-[500px] w-[200px] h-auto break-words text-wrap rounded-md px-2 py-1 shadow-lg whitespace-nowrap z-10`}
          >
            {messages}
          </div>
        )}
      </div>

      {/* Always visible help text */}
      {helpText && <p className="text-xs  mt-1 font-figTree text-[#18181B]">{helpText}</p>}
    </div>
  );
};

export default FormField;
