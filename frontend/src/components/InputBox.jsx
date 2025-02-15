import React from "react";

export function InputBox({ label, placeholder, onChange, value, type = "text" }) {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">{label}</div>
      <input
        type={type}
        value={value} // Ensure value is controlled
        onChange={onChange} // FIXED: Correct camelCase
        placeholder={placeholder}
        className="w-full px-2 py-1 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
      />
    </div>
  );
}

  