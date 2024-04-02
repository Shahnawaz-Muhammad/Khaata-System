// InputField.js
import React from "react";

const InputField = ({ label, type, value, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
      />
    </div>
  );
};

export default InputField;
