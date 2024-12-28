import React from "react";

const Input = (props) => {
  const {
    placeholder,
    value,
    onChange,
    className,
    label,
    type = "text",
    name,
  } = props;

  return (
    <div className="mb-3">
      <label className="block text-xs font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`mt-1 w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 ${className}`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
